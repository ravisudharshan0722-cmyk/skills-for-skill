'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import {
  Clock, CheckCircle, HelpCircle, Bookmark, AlertTriangle,
  Play, Send, Maximize, Minimize, ChevronLeft, ChevronRight,
  Code2, Check, X, FileText
} from 'lucide-react';

export default function TeachingExaminationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get('id');

  const [sessionData, setSessionData] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0); // 0 to 13
  const [answers, setAnswers] = useState({ mcqs: {}, coding: {}, teaching: {} });
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runCodeLoading, setRunCodeLoading] = useState(false);
  const [runCodeResults, setRunCodeResults] = useState(null);

  const timerRef = useRef(null);

  // Final Submission Callback
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const startedTime = new Date(sessionData?.startedAt || Date.now()).getTime();
    const timeTakenSeconds = Math.floor((Date.now() - startedTime) / 1000);

    try {
      const res = await fetch('/api/teaching-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          answers,
          timeTakenSeconds
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit assessment.');
      }

      localStorage.setItem(`result_${assessmentId}`, JSON.stringify(result));
      localStorage.removeItem(`active_test_${assessmentId}`);
      localStorage.removeItem(`progress_${assessmentId}`);

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      router.push(`/teaching-test/result/${assessmentId}`);
    } catch (err) {
      alert(`Submission error: ${err.message}`);
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
    }
  }, [assessmentId, answers, sessionData, router]);

  // 1. Load active test session from localStorage or server
  useEffect(() => {
    if (!assessmentId) {
      router.push('/teaching-test');
      return;
    }

    const savedSession = localStorage.getItem(`active_test_${assessmentId}`);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setSessionData(parsed);

        const savedProgress = localStorage.getItem(`progress_${assessmentId}`);
        if (savedProgress) {
          const progressParsed = JSON.parse(savedProgress);
          if (progressParsed.answers) setAnswers(progressParsed.answers);
          if (progressParsed.markedForReview) setMarkedForReview(new Set(progressParsed.markedForReview));
        }

        const startedTime = new Date(parsed.startedAt).getTime();
        const now = Date.now();
        const elapsedSec = Math.floor((now - startedTime) / 1000);
        const remaining = Math.max(0, parsed.durationSeconds - elapsedSec);
        setTimeLeft(remaining);
      } catch (e) {
        console.error('Error loading session:', e);
      }
    } else {
      router.push('/teaching-test');
    }
  }, [assessmentId, router]);

  // 2. Timer Countdown & Auto-Submit
  useEffect(() => {
    if (timeLeft <= 0 && sessionData && !isSubmitting) {
      handleFinalSubmit();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, sessionData, isSubmitting, handleFinalSubmit]);

  // 3. Save progress on answer changes
  useEffect(() => {
    if (assessmentId) {
      localStorage.setItem(`progress_${assessmentId}`, JSON.stringify({
        answers,
        markedForReview: Array.from(markedForReview)
      }));
    }
  }, [answers, markedForReview, assessmentId]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Build flattened question list
  const allQuestions = [];
  if (sessionData?.questions) {
    sessionData.questions.mcqs?.forEach(m => allQuestions.push({ ...m, type: 'mcq' }));
    sessionData.questions.coding?.forEach(c => allQuestions.push({ ...c, type: 'coding' }));
    sessionData.questions.teaching?.forEach(t => allQuestions.push({ ...t, type: 'teaching' }));
  }

  const currentQ = allQuestions[currentIdx];

  // Helper: check if question is answered
  const isQuestionAnswered = (q) => {
    if (!q) return false;
    if (q.type === 'mcq') return answers.mcqs[q.id] !== undefined;
    if (q.type === 'coding') return !!(answers.coding[q.id] && answers.coding[q.id].trim());
    if (q.type === 'teaching') return !!(answers.teaching[q.id] && answers.teaching[q.id].trim().length >= 10);
    return false;
  };

  const answeredCount = allQuestions.filter(isQuestionAnswered).length;
  const unansweredCount = allQuestions.length - answeredCount;

  // Answer handlers
  const handleSelectMcq = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      mcqs: { ...prev.mcqs, [questionId]: optionIndex }
    }));
  };

  const handleCodeChange = (questionId, code) => {
    setAnswers(prev => ({
      ...prev,
      coding: { ...prev.coding, [questionId]: code }
    }));
  };

  const handleTeachingChange = (questionId, text) => {
    setAnswers(prev => ({
      ...prev,
      teaching: { ...prev.teaching, [questionId]: text }
    }));
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  // Test Sample Cases in Playground
  const handleRunSampleCode = async () => {
    if (!currentQ || currentQ.type !== 'coding') return;
    const userCode = answers.coding[currentQ.id] || currentQ.starterCode;

    setRunCodeLoading(true);
    setRunCodeResults(null);

    try {
      const res = await fetch('/api/teaching-test/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: sessionData.language,
          code: userCode,
          testCases: currentQ.sampleTestCases
        })
      });

      const data = await res.json();
      setRunCodeResults(data.results || []);
    } catch (err) {
      setRunCodeResults([{ passed: false, error: err.message }]);
    } finally {
      setRunCodeLoading(false);
    }
  };

  if (!sessionData || !currentQ) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
        <p className="text-foreground-secondary text-sm">Loading examination environment...</p>
      </div>
    );
  }

  const isCurrentMarked = markedForReview.has(currentQ.id);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-background">
      {/* ========================================================================= */}
      {/* 1. EXAMINATION HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between border-b border-border bg-surface-card px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="brand" className="font-mono text-xs uppercase px-2.5 py-1">
            {sessionData.language}
          </Badge>
          <span className="font-bold text-foreground text-sm sm:text-base">
            Teaching Eligibility Examination
          </span>
          <Badge variant="default" className="text-xs capitalize">
            {sessionData.level}
          </Badge>
        </div>

        {/* Right Header Stats & Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Live Countdown Timer */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
            timeLeft < 300
              ? 'bg-error-soft text-error border-error animate-pulse'
              : 'bg-surface text-foreground border-border'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="small"
            onClick={toggleFullscreen}
            className="hidden sm:flex text-foreground-secondary hover:text-foreground"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>

          {/* Submit Test Button */}
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsSubmitModalOpen(true)}
            className="font-bold bg-success hover:bg-success/90 text-white"
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN EXAMINATION WORKSPACE */}
      {/* ========================================================================= */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Question Content & Interactive Work Area */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto max-w-4xl border-r border-border">
          {/* Question Meta Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-foreground">
                Question {currentQ.questionNumber} of {allQuestions.length}
              </span>
              <Badge variant="default" className="text-xs uppercase ml-2">
                Section: {currentQ.type.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-primary">{currentQ.marks} Marks</span>
              <Button
                variant="outline"
                size="small"
                onClick={() => toggleMarkForReview(currentQ.id)}
                className={`text-xs flex items-center gap-1.5 ${
                  isCurrentMarked ? 'bg-warning-soft text-warning border-warning' : 'text-foreground-secondary'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" fill={isCurrentMarked ? 'currentColor' : 'none'} />
                {isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}
              </Button>
            </div>
          </div>

          {/* QUESTION TYPE A: MULTIPLE CHOICE QUESTION */}
          {currentQ.type === 'mcq' && (
            <div className="space-y-6 flex-1">
              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                {currentQ.question}
              </p>

              <div className="space-y-3 pt-2">
                {currentQ.options?.map((option, idx) => {
                  const isSelected = answers.mcqs[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectMcq(currentQ.id, idx)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary-soft text-foreground font-semibold ring-1 ring-primary'
                          : 'border-border bg-surface hover:border-border-strong hover:bg-surface-hover text-foreground-secondary'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                        isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-border bg-surface-card'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION TYPE B: CODING CHALLENGE */}
          {currentQ.type === 'coding' && (
            <div className="space-y-6 flex-1 flex flex-col">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">{currentQ.title}</h2>
                <p className="text-sm text-foreground-secondary whitespace-pre-wrap leading-relaxed">
                  {currentQ.description}
                </p>
                {currentQ.constraints && (
                  <div className="mt-3 text-xs text-foreground-muted bg-surface p-2.5 rounded-lg border border-border">
                    <strong>Constraints:</strong> {currentQ.constraints}
                  </div>
                )}
              </div>

              {/* Code Editor Container */}
              <div className="flex-1 flex flex-col border border-border rounded-xl bg-graphite-950 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between bg-surface-card px-4 py-2 border-b border-border text-xs text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span>Language: <strong>{sessionData.language}</strong></span>
                  </div>
                  <span>Sandbox Environment Enabled</span>
                </div>

                <textarea
                  value={answers.coding[currentQ.id] ?? currentQ.starterCode}
                  onChange={(e) => handleCodeChange(currentQ.id, e.target.value)}
                  placeholder="// Write your code here..."
                  rows={14}
                  spellCheck={false}
                  className="w-full flex-1 p-4 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-y leading-relaxed"
                  onKeyDown={(e) => {
                    // Support Tab indentation
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;
                      const value = e.target.value;
                      e.target.value = value.substring(0, start) + '  ' + value.substring(end);
                      e.target.selectionStart = e.target.selectionEnd = start + 2;
                      handleCodeChange(currentQ.id, e.target.value);
                    }
                  }}
                />

                {/* Editor Action Bar */}
                <div className="flex items-center justify-between p-3 bg-surface border-t border-border">
                  <div className="text-xs text-foreground-muted">
                    Press Tab for 2 spaces indentation
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={handleRunSampleCode}
                    disabled={runCodeLoading}
                    className="flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {runCodeLoading ? 'Executing Sandbox...' : 'Run Sample Cases'}
                  </Button>
                </div>
              </div>

              {/* Sample Test Cases & Results Panel */}
              <div className="border border-border rounded-xl bg-surface p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Sample Test Cases
                </h3>
                <div className="space-y-2">
                  {currentQ.sampleTestCases?.map((tc, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-surface-card border border-border text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-foreground-secondary">Input: <strong>{tc.input}</strong></span>
                        <span className="font-mono text-foreground">Expected: <strong>{tc.expected}</strong></span>
                      </div>
                      {tc.explanation && (
                        <p className="text-foreground-muted">{tc.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Live Sandbox Execution Output */}
                {runCodeResults && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-xs font-bold text-foreground block mb-2">Sandbox Test Output:</span>
                    <div className="space-y-2">
                      {runCodeResults.map((res, i) => (
                        <div key={i} className={`p-3 rounded-lg border text-xs ${
                          res.passed ? 'bg-success-soft border-success text-success' : 'bg-error-soft border-error text-error'
                        }`}>
                          <div className="flex items-center justify-between font-bold">
                            <span>Case {i + 1}: {res.passed ? 'PASSED ✓' : 'FAILED ✕'}</span>
                            <span className="text-[10px] opacity-80">{res.serviceStatus || 'Executed'}</span>
                          </div>
                          {res.actual && <div className="font-mono mt-1">Output: {res.actual}</div>}
                          {res.error && <div className="mt-1 font-mono">{res.error}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUESTION TYPE C: TEACHING & EXPLANATION QUESTION */}
          {currentQ.type === 'teaching' && (
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="p-4 rounded-xl border border-primary/40 bg-primary-soft/20">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-1">
                  <FileText className="w-4 h-4" /> Teaching & Pedagogical Scenario
                </div>
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {currentQ.prompt}
                </p>
              </div>

              <div className="flex-1 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-xs text-foreground-muted">
                  <span>Write your explanation as if speaking directly to a beginner student:</span>
                  <span>
                    Words: {(answers.teaching[currentQ.id] || '').trim().split(/\s+/).filter(Boolean).length}
                  </span>
                </div>
                <textarea
                  value={answers.teaching[currentQ.id] || ''}
                  onChange={(e) => handleTeachingChange(currentQ.id, e.target.value)}
                  placeholder="Provide a clear conceptual breakdown, an everyday real-world analogy, step-by-step logic, and a clean code snippet..."
                  rows={12}
                  className="w-full flex-1 p-4 rounded-xl border border-border bg-surface font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y"
                />
              </div>

              <div className="text-xs text-foreground-muted bg-surface-elevated/40 p-3 rounded-lg border border-border">
                <strong>Evaluation Rubric:</strong> Explanations are graded on technical correctness (1.5 marks), clarity (1.0 mark), logical reasoning (1.0 mark), teaching suitability (0.75 marks), and practical examples (0.75 marks).
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
            <Button
              variant="outline"
              disabled={currentIdx === 0}
              onClick={() => {
                setRunCodeResults(null);
                setCurrentIdx(prev => Math.max(0, prev - 1));
              }}
              className="flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <span className="text-xs text-foreground-muted">
              {answeredCount} of {allQuestions.length} answered
            </span>

            {currentIdx < allQuestions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => {
                  setRunCodeResults(null);
                  setCurrentIdx(prev => Math.min(allQuestions.length - 1, prev + 1));
                }}
                className="flex items-center gap-1.5"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsSubmitModalOpen(true)}
                className="bg-success hover:bg-success/90 text-white"
              >
                Review & Submit
              </Button>
            )}
          </div>
        </main>

        {/* Right Side: Question Navigation Palette & Stats */}
        <aside className="w-full lg:w-80 bg-surface-card p-4 sm:p-6 border-t lg:border-t-0 border-border flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                Question Palette
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {allQuestions.map((q, idx) => {
                  const isCurrent = currentIdx === idx;
                  const isAnswered = isQuestionAnswered(q);
                  const isMarked = markedForReview.has(q.id);

                  let btnStyle = 'border-border bg-surface text-foreground-secondary hover:border-border-strong';
                  if (isMarked) {
                    btnStyle = 'border-warning bg-warning-soft text-warning font-bold';
                  } else if (isAnswered) {
                    btnStyle = 'border-success bg-success-soft text-success font-bold';
                  }

                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-primary border-primary';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setRunCodeResults(null);
                        setCurrentIdx(idx);
                      }}
                      className={`h-10 rounded-lg border text-xs font-medium transition-all relative ${btnStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                      {isMarked && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-warning" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="border border-border rounded-xl p-3 bg-surface space-y-2 text-xs">
              <span className="font-semibold text-foreground block mb-1">Status Legend:</span>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-success-soft border border-success" />
                <span className="text-foreground-secondary">Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-warning-soft border border-warning" />
                <span className="text-foreground-secondary">Marked for Review ({markedForReview.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-surface border border-border" />
                <span className="text-foreground-secondary">Unanswered ({unansweredCount})</span>
              </div>
            </div>

            {/* Section Breakdown Pills */}
            <div className="space-y-1.5 text-xs text-foreground-muted">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Section A (MCQs 1-10)</span>
                <span>20 Marks</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Section B (Coding 11-12)</span>
                <span>20 Marks</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Section C (Teaching 13-14)</span>
                <span>10 Marks</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-6">
            <Button
              variant="primary"
              className="w-full bg-success hover:bg-success/90 text-white font-bold"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Finish & Submit Test
            </Button>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONFIRMATION MODAL BEFORE FINAL SUBMISSION */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => !isSubmitting && setIsSubmitModalOpen(false)}
        title="Submit Examination?"
      >
        <div className="space-y-4">
          <p className="text-sm text-foreground-secondary leading-relaxed">
            Are you sure you want to finalize and submit your Teaching Eligibility Test for <strong>{sessionData.language} ({sessionData.level})</strong>?
          </p>

          <div className="p-4 rounded-xl border border-border bg-surface space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-secondary">Answered Questions:</span>
              <strong className="text-success">{answeredCount} of {allQuestions.length}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-secondary">Unanswered Questions:</span>
              <strong className={unansweredCount > 0 ? 'text-warning' : 'text-foreground-muted'}>
                {unansweredCount}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-secondary">Marked for Review:</span>
              <strong className="text-foreground">{markedForReview.size}</strong>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-warning-soft border border-warning text-warning text-xs">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Warning: You have {unansweredCount} unanswered questions. Unanswered questions receive 0 marks.</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Continue Test
            </Button>
            <Button
              variant="primary"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="bg-success hover:bg-success/90 text-white font-bold"
            >
              {isSubmitting ? 'Grading & Evaluating...' : 'Confirm Submission'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
