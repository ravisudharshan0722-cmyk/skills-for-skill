'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, XCircle, Clock, Award, ShieldCheck,
  ChevronDown, ChevronUp, ArrowRight, RotateCcw, UserCheck, Code, BookOpen
} from 'lucide-react';

export default function TeachingTestResultPage({ params }) {
  const { id: assessmentId } = use(params);
  const router = useRouter();

  const [resultData, setResultData] = useState(null);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'review'
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    // 1. First check localStorage for immediate post-submission cached results
    const cached = localStorage.getItem(`result_${assessmentId}`);
    if (cached) {
      try {
        setResultData(JSON.parse(cached));
        return;
      } catch (e) {}
    }

    // 2. Otherwise fetch from API
    fetch(`/api/teaching-test/submit?id=${assessmentId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setResultData(data);
        }
      })
      .catch(() => {});
  }, [assessmentId]);

  if (!resultData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
        <p className="text-foreground-secondary text-sm">Loading examination results & AI evaluation...</p>
      </div>
    );
  }

  const {
    language,
    level,
    totalScore,
    percentage,
    passed,
    passEvaluation,
    scores,
    timeTakenSeconds,
    aiFeedback,
    review
  } = resultData;

  const toggleExpand = (qId) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const formatMinutes = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-4xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. RESULT HEADER BANNER */}
      {/* ========================================================================= */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        passed
          ? 'bg-success-soft/30 border-success/40 text-foreground'
          : 'bg-error-soft/30 border-error/40 text-foreground'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              passed ? 'bg-success text-white' : 'bg-error text-white'
            }`}>
              {passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={passed ? 'brand' : 'default'} className="font-mono text-xs uppercase">
                  {language} — {level}
                </Badge>
                <span className="text-xs text-foreground-muted">
                  Completed in {formatMinutes(timeTakenSeconds || 0)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {passed ? 'Teaching Eligibility Confirmed!' : 'Assessment Not Qualified'}
              </h1>
              <p className="text-sm text-foreground-secondary mt-1 max-w-xl">
                {passed
                  ? `You have satisfied all section requirements and the 70% threshold. You are officially verified to teach ${language} (${level.toUpperCase()}).`
                  : `You did not satisfy the minimum requirements for this attempt. Review the constructive feedback below to prepare for a retake.`}
              </p>
            </div>
          </div>

          {/* Big Score Display */}
          <div className="flex flex-col items-end border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <span className="text-xs text-foreground-muted uppercase font-bold tracking-wider">Final Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-4xl sm:text-5xl font-black ${passed ? 'text-success' : 'text-error'}`}>
                {totalScore}
              </span>
              <span className="text-lg font-bold text-foreground-muted">/ 50</span>
            </div>
            <span className="text-xs font-semibold text-foreground-secondary mt-0.5">
              {percentage}% (Passing: 70%)
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION-WISE BREAKDOWN CARDS */}
      {/* ========================================================================= */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Section A: MCQ */}
        <div className="p-5 rounded-xl border border-border bg-surface-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Section A: MCQs</span>
            <Badge variant={scores?.mcq?.passed ? 'brand' : 'default'} className="text-[10px]">
              {scores?.mcq?.passed ? 'Min Met ✓' : 'Below Min ✕'}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">{scores?.mcq?.score}</span>
            <span className="text-xs text-foreground-muted">/ 20</span>
          </div>
          <p className="text-xs text-foreground-secondary">
            Min Required: 10 / 20 (50%)
          </p>
        </div>

        {/* Section B: Coding */}
        <div className="p-5 rounded-xl border border-border bg-surface-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Section B: Coding</span>
            <Badge variant={scores?.coding?.passed ? 'brand' : 'default'} className="text-[10px]">
              {scores?.coding?.passed ? 'Min Met ✓' : 'Below Min ✕'}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">{scores?.coding?.score}</span>
            <span className="text-xs text-foreground-muted">/ 20</span>
          </div>
          <p className="text-xs text-foreground-secondary">
            Min Required: 10 / 20 (50%)
          </p>
        </div>

        {/* Section C: Teaching */}
        <div className="p-5 rounded-xl border border-border bg-surface-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Section C: Teaching</span>
            <Badge variant={scores?.teaching?.passed ? 'brand' : 'default'} className="text-[10px]">
              {scores?.teaching?.passed ? 'Min Met ✓' : 'Below Min ✕'}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">{scores?.teaching?.score}</span>
            <span className="text-xs text-foreground-muted">/ 10</span>
          </div>
          <p className="text-xs text-foreground-secondary">
            Min Required: 5 / 10 (50%)
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. AI-GENERATED CONSTRUCTIVE FEEDBACK */}
      {/* ========================================================================= */}
      <Card className="bg-surface-card border-border shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-1">
            <Award className="w-4 h-4" /> Comprehensive Performance Evaluation
          </div>
          <CardTitle as="h2" className="text-lg font-bold">
            AI-Assisted Assessment Feedback
          </CardTitle>
          <CardDescription>
            Detailed analysis of your technical mastery and pedagogical delivery.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-sm text-foreground leading-relaxed font-medium bg-surface p-4 rounded-xl border border-border">
            {aiFeedback?.constructiveFeedback}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-success uppercase tracking-wider block">
                Demonstrated Strengths
              </span>
              <ul className="space-y-1.5 text-xs text-foreground-secondary">
                {aiFeedback?.strengths?.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-success font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-warning uppercase tracking-wider block">
                Areas for Improvement
              </span>
              <ul className="space-y-1.5 text-xs text-foreground-secondary">
                {aiFeedback?.improvements?.length > 0 ? (
                  aiFeedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-warning font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-foreground-muted italic">
                    No major deficiencies identified across evaluated criteria.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 4. ACTIONS & PROFILE NAVIGATION */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-border bg-surface">
        <div className="flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {passed
              ? 'Your verified teaching badge has been awarded and is visible on your profile!'
              : 'You can retake this assessment at any time.'}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            as={Link}
            href="/teaching-test"
            className="flex items-center gap-1.5 flex-1 sm:flex-initial"
          >
            <RotateCcw className="w-4 h-4" /> Retake / Choose Level
          </Button>

          <Button
            variant="primary"
            as={Link}
            href="/my-skills"
            className="flex items-center gap-1.5 flex-1 sm:flex-initial"
          >
            Go to My Skills <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. QUESTION-BY-QUESTION DETAILED REVIEW */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-bold text-foreground">Detailed Question Review & Explanations</h2>
          <span className="text-xs text-foreground-muted">Revealed post-examination</span>
        </div>

        {/* SECTION A: MCQs Review */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            Section A: Multiple Choice Questions ({review?.mcqs?.length || 0})
          </h3>
          {review?.mcqs?.map((m) => {
            const isExpanded = expandedQuestions.has(m.id);
            return (
              <div key={m.id} className="border border-border rounded-xl bg-surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleExpand(m.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      m.isCorrect ? 'bg-success' : 'bg-error'
                    }`}>
                      {m.isCorrect ? '✓' : '✕'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      Q{m.questionNumber}: {m.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant={m.isCorrect ? 'brand' : 'default'}>
                      {m.marksAwarded} / 2 Marks
                    </Badge>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-border bg-surface space-y-3 text-xs">
                    <div className="space-y-1.5">
                      {m.options?.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg flex items-center justify-between ${
                            i === m.correctIndex
                              ? 'bg-success-soft text-success font-bold border border-success'
                              : i === m.selectedIndex && !m.isCorrect
                              ? 'bg-error-soft text-error line-through border border-error'
                              : 'text-foreground-secondary'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + i)}. {opt}</span>
                          {i === m.correctIndex && <span>(Correct Answer)</span>}
                          {i === m.selectedIndex && i !== m.correctIndex && <span>(Your Selection)</span>}
                        </div>
                      ))}
                    </div>

                    {m.explanation && (
                      <div className="p-3 rounded-lg bg-surface-elevated/50 border border-border text-foreground-secondary">
                        <strong className="text-foreground">Explanation:</strong> {m.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SECTION B: Coding Challenges Review */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            Section B: Coding Challenges ({review?.coding?.length || 0})
          </h3>
          {review?.coding?.map((c) => {
            const isExpanded = expandedQuestions.has(c.id);
            return (
              <div key={c.id} className="border border-border rounded-xl bg-surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleExpand(c.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm font-bold text-foreground block">{c.title}</span>
                      <span className="text-xs text-foreground-muted">
                        Test cases passed: {c.passedCount} of {c.totalTestCases}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant="brand">{c.marksAwarded} / 10 Marks</Badge>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-border bg-surface space-y-4 text-xs">
                    <div>
                      <span className="font-bold text-foreground block mb-1">Submitted Code:</span>
                      <pre className="p-3 rounded-lg bg-graphite-950 font-mono text-foreground border border-border overflow-x-auto text-[11px] leading-relaxed">
                        {c.submittedCode || '// No code submitted'}
                      </pre>
                    </div>

                    {c.results && (
                      <div className="space-y-2">
                        <span className="font-bold text-foreground block">Test Case Results:</span>
                        {c.results.map((r, ri) => (
                          <div key={ri} className={`p-2.5 rounded-lg border flex items-center justify-between ${
                            r.passed ? 'bg-success-soft/30 border-success/40 text-success' : 'bg-error-soft/30 border-error/40 text-error'
                          }`}>
                            <span className="font-mono">Case {ri + 1}: {r.passed ? 'PASSED ✓' : 'FAILED ✕'}</span>
                            <span className="font-mono text-[11px] text-foreground-secondary">
                              Expected: {r.expected} | Got: {r.actual || r.error || 'None'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SECTION C: Teaching Scenarios Review */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            Section C: Teaching & Pedagogical Responses ({review?.teaching?.length || 0})
          </h3>
          {review?.teaching?.map((t) => {
            const isExpanded = expandedQuestions.has(t.id);
            return (
              <div key={t.id} className="border border-border rounded-xl bg-surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleExpand(t.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm font-bold text-foreground block">Teaching Scenario</span>
                      <span className="text-xs text-foreground-muted line-clamp-1">{t.prompt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant="brand">{t.marksAwarded} / 5 Marks</Badge>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-border bg-surface space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-surface-elevated/40 border border-border text-foreground-secondary">
                      <strong className="text-foreground">Prompt:</strong> {t.prompt}
                    </div>

                    <div>
                      <span className="font-bold text-foreground block mb-1">Candidate Submitted Explanation:</span>
                      <p className="p-3 rounded-lg bg-surface-card border border-border text-foreground whitespace-pre-wrap leading-relaxed">
                        {t.submittedAnswer || 'No response submitted.'}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-primary-soft/20 border border-primary/40 space-y-2">
                      <span className="font-bold text-primary block">Rubric Evaluation Feedback:</span>
                      <p className="text-foreground">{t.feedback}</p>
                      {t.rubricBreakdown && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-border text-[11px]">
                          <div>Correctness: <strong>{t.rubricBreakdown.technicalCorrectness}/1.5</strong></div>
                          <div>Clarity: <strong>{t.rubricBreakdown.clarity}/1.0</strong></div>
                          <div>Reasoning: <strong>{t.rubricBreakdown.logicalReasoning}/1.0</strong></div>
                          <div>Pedagogy: <strong>{t.rubricBreakdown.teachingSuitability}/0.75</strong></div>
                          <div>Examples: <strong>{t.rubricBreakdown.examples}/0.75</strong></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
