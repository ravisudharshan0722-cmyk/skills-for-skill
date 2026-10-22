'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../lib/user-context';
import { SUPPORTED_LANGUAGES, ASSESSMENT_LEVELS } from '../../../lib/teaching-test/config';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { CheckCircle2, AlertCircle, ArrowRight, BookOpen, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';

export default function TeachingTestReadinessPage() {
  const router = useRouter();
  const { currentUser } = useUser();

  // Wizard state: 'select_language' | 'ask_willingness' | 'ask_test_readiness' | 'select_level' | 'confirm_rules'
  const [step, setStep] = useState('select_language');
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0].id);
  const [customLanguage, setCustomLanguage] = useState('');
  const [willingToTeach, setWillingToTeach] = useState(null);
  const [readyForTest, setReadyForTest] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('basics');
  const [confirmedRules, setConfirmedRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.id === selectedLanguage) || {
    id: selectedLanguage,
    name: selectedLanguage.toUpperCase(),
    icon: '💻'
  };

  const levelInfo = ASSESSMENT_LEVELS[selectedLevel];

  // Handler for Step B: Ready to teach
  const handleWillingnessResponse = async (isWilling) => {
    setWillingToTeach(isWilling);
    try {
      await fetch('/api/teaching-test/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          willingToTeach: isWilling,
          readyForTest: false,
          userId: currentUser?.id
        })
      });
    } catch (e) {
      // Non-blocking
    }

    if (isWilling) {
      setStep('ask_test_readiness');
    } else {
      setStep('declined_teaching');
    }
  };

  // Handler for Step C: Ready to attend eligibility test
  const handleTestReadinessResponse = async (isReady) => {
    setReadyForTest(isReady);
    try {
      await fetch('/api/teaching-test/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          willingToTeach: true,
          readyForTest: isReady,
          userId: currentUser?.id
        })
      });
    } catch (e) {
      // Non-blocking
    }

    if (isReady) {
      setStep('select_level');
    } else {
      setStep('postponed_test');
    }
  };

  // Handler for Step E: Confirm & Start Test
  const handleStartTest = async () => {
    if (!confirmedRules) {
      setErrorMsg('Please confirm that you have read and agreed to the assessment rules.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/teaching-test/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          level: selectedLevel,
          confirmedReady: true,
          userId: currentUser?.id
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start assessment session.');
      }

      // Store active session in localStorage for crash/refresh recovery
      localStorage.setItem(`active_test_${data.assessmentId}`, JSON.stringify({
        assessmentId: data.assessmentId,
        language: selectedLanguage,
        level: selectedLevel,
        durationSeconds: data.durationSeconds,
        startedAt: data.startedAt,
        questions: data.questions
      }));

      // Navigate to examination interface
      router.push(`/teaching-test/exam?id=${data.assessmentId}`);
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" className="text-xs uppercase tracking-wider">
              Verification Engine
            </Badge>
            <span className="text-xs text-foreground-muted">AI-Powered Evaluation</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Teaching Eligibility Test
          </h1>
          <p className="text-foreground-secondary mt-1 text-sm md:text-base">
            Qualify to teach programming languages with independent, level-specific verification badges.
          </p>
        </div>
      </div>

      {/* Wizard Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 text-xs font-medium">
        <div className={`p-2 rounded border text-center transition-colors ${step === 'select_language' ? 'border-primary bg-primary-soft text-primary' : 'border-border text-foreground-muted'}`}>
          1. Language
        </div>
        <div className={`p-2 rounded border text-center transition-colors ${['ask_willingness', 'ask_test_readiness'].includes(step) ? 'border-primary bg-primary-soft text-primary' : 'border-border text-foreground-muted'}`}>
          2. Readiness
        </div>
        <div className={`p-2 rounded border text-center transition-colors ${step === 'select_level' ? 'border-primary bg-primary-soft text-primary' : 'border-border text-foreground-muted'}`}>
          3. Level & Syllabus
        </div>
        <div className={`p-2 rounded border text-center transition-colors ${step === 'confirm_rules' ? 'border-primary bg-primary-soft text-primary' : 'border-border text-foreground-muted'}`}>
          4. Examination
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-error-soft border border-error text-error text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP A: Select Programming Language */}
      {/* ========================================================================= */}
      {step === 'select_language' && (
        <Card className="bg-surface-card border-border shadow-sm">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-semibold flex items-center gap-2">
              <span>Step A:</span> Select Programming Language
            </CardTitle>
            <CardDescription>
              Choose the language you wish to teach or qualify for on the Skill Exchange platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-soft text-foreground shadow-sm ring-1 ring-primary'
                        : 'border-border bg-surface hover:border-border-strong text-foreground-secondary hover:text-foreground'
                    }`}
                  >
                    <span className="text-3xl mb-2">{lang.icon}</span>
                    <span className="font-semibold text-sm">{lang.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button
                variant="primary"
                onClick={() => setStep('ask_willingness')}
                className="flex items-center gap-2"
              >
                Continue to Readiness <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP B: Ask Whether Ready to Teach */}
      {/* ========================================================================= */}
      {step === 'ask_willingness' && (
        <Card className="bg-surface-card border-border shadow-sm animate-in fade-in duration-300">
          <CardHeader>
            <Badge variant="brand" className="w-fit mb-2">Step B</Badge>
            <CardTitle as="h2" className="text-2xl font-bold">
              Are you ready to teach {currentLangObj.name}?
            </CardTitle>
            <CardDescription className="text-base text-foreground-secondary">
              Indicate whether you are open and willing to mentor or teach other community members in {currentLangObj.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleWillingnessResponse(true)}
                className="flex flex-col items-start p-6 rounded-xl border border-border bg-surface hover:border-primary hover:bg-surface-hover transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-success-soft text-success flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-foreground">Yes, I am ready to teach</h3>
                <p className="text-sm text-foreground-secondary mt-1">
                  Save my willingness to teach {currentLangObj.name} and proceed to the AI eligibility assessment.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleWillingnessResponse(false)}
                className="flex flex-col items-start p-6 rounded-xl border border-border bg-surface hover:border-border-strong hover:bg-surface-hover transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-surface-elevated text-foreground-secondary flex items-center justify-center font-bold text-lg mb-4">
                  ✕
                </div>
                <h3 className="text-lg font-bold text-foreground">No, not to teach</h3>
                <p className="text-sm text-foreground-secondary mt-1">
                  Save my response for personal skill tracking without initiating teaching eligibility.
                </p>
              </button>
            </div>

            <div className="pt-2 flex justify-start">
              <Button variant="ghost" size="small" onClick={() => setStep('select_language')}>
                ← Back to language selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step B Declined View */}
      {step === 'declined_teaching' && (
        <Card className="bg-surface-card border-border shadow-sm p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-elevated mx-auto flex items-center justify-center text-foreground-muted text-xl">
            ℹ️
          </div>
          <h2 className="text-xl font-bold text-foreground">Response Saved</h2>
          <p className="text-foreground-secondary max-w-md mx-auto text-sm">
            We have recorded that you do not wish to teach {currentLangObj.name} at this time. The eligibility test has not been initiated. You can always change your mind later!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="outline" onClick={() => setStep('select_language')}>
              Select Another Language
            </Button>
            <Button variant="primary" onClick={() => router.push('/my-skills')}>
              Return to My Skills
            </Button>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP C: Ask Whether Ready to Attend Test */}
      {/* ========================================================================= */}
      {step === 'ask_test_readiness' && (
        <Card className="bg-surface-card border-border shadow-sm animate-in fade-in duration-300">
          <CardHeader>
            <Badge variant="brand" className="w-fit mb-2">Step C</Badge>
            <CardTitle as="h2" className="text-2xl font-bold">
              Are you ready to attend the AI Teaching Eligibility Test?
            </CardTitle>
            <CardDescription className="text-base text-foreground-secondary">
              A timed 14-question examination (10 MCQs, 2 Coding Challenges, 2 Teaching Scenarios) evaluating your conceptual depth and instructional clarity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleTestReadinessResponse(true)}
                className="flex flex-col items-start p-6 rounded-xl border border-primary bg-primary-soft/40 hover:bg-primary-soft transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                  ★
                </div>
                <h3 className="text-lg font-bold text-foreground">Yes, Start Test</h3>
                <p className="text-sm text-foreground-secondary mt-1">
                  I want to choose my level, review the syllabus, and start the examination now.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleTestReadinessResponse(false)}
                className="flex flex-col items-start p-6 rounded-xl border border-border bg-surface hover:border-border-strong hover:bg-surface-hover transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-surface-elevated text-foreground-secondary flex items-center justify-center font-bold text-lg mb-4">
                  ⏳
                </div>
                <h3 className="text-lg font-bold text-foreground">Not Now</h3>
                <p className="text-sm text-foreground-secondary mt-1">
                  Save my readiness to teach, but take the eligibility examination at a later time.
                </p>
              </button>
            </div>

            <div className="pt-2 flex justify-start">
              <Button variant="ghost" size="small" onClick={() => setStep('ask_willingness')}>
                ← Back
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step C Postponed View */}
      {step === 'postponed_test' && (
        <Card className="bg-surface-card border-border shadow-sm p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-elevated mx-auto flex items-center justify-center text-foreground-muted text-xl">
            👍
          </div>
          <h2 className="text-xl font-bold text-foreground">Preferences Saved</h2>
          <p className="text-foreground-secondary max-w-md mx-auto text-sm">
            Your willingness to teach {currentLangObj.name} is saved. Whenever you feel ready to take the timed eligibility examination and earn your verified badge, return to this section!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="outline" onClick={() => router.push('/my-skills')}>
              Back to My Skills
            </Button>
            <Button variant="primary" onClick={() => setStep('select_level')}>
              Actually, I want to take it now
            </Button>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP D: Select Assessment Level */}
      {/* ========================================================================= */}
      {step === 'select_level' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="text-center md:text-left">
            <Badge variant="brand" className="mb-2">Step D</Badge>
            <h2 className="text-2xl font-bold text-foreground">
              Select Assessment Level for {currentLangObj.name}
            </h2>
            <p className="text-foreground-secondary text-sm mt-1">
              Each level is independent. Passing one level verifies that specific level only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(ASSESSMENT_LEVELS).map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary-soft/30 shadow-md ring-2 ring-primary'
                      : 'border-border bg-surface-card hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg text-foreground">{lvl.title.split('—')[0]}</span>
                      <Badge variant={isSelected ? 'brand' : 'default'} className="text-xs">
                        {lvl.durationMinutes} mins
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground-muted mb-4">{lvl.targetAudience}</p>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <span className="text-xs font-semibold text-primary block mb-2">Syllabus Highlights:</span>
                    <ul className="text-xs text-foreground-secondary space-y-1.5 list-disc list-inside">
                      {lvl.syllabus.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Level Syllabus Preview Card */}
          <Card className="bg-surface border-border">
            <CardHeader className="pb-3">
              <CardTitle as="h3" className="text-base font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Detailed Syllabus: {levelInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {levelInfo.syllabus.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-foreground-secondary">
                    <span className="text-primary font-bold">•</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-surface-card border border-border flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Duration: <strong>{levelInfo.durationMinutes} Minutes</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Total Marks: <strong>50 Marks</strong> (Passing: 35 / 70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Sections: <strong>10 MCQs + 2 Coding + 2 Teaching</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" onClick={() => setStep('ask_test_readiness')}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep('confirm_rules')}>
              Proceed to Instructions <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP E: Confirm Instructions & Start Test */}
      {/* ========================================================================= */}
      {step === 'confirm_rules' && (
        <Card className="bg-surface-card border-border shadow-md animate-in fade-in duration-300">
          <CardHeader className="border-b border-border pb-4">
            <Badge variant="brand" className="w-fit mb-2">Step E — Pre-Test Confirmation</Badge>
            <CardTitle as="h2" className="text-2xl font-bold">
              Examination Instructions: {currentLangObj.name} ({levelInfo.title})
            </CardTitle>
            <CardDescription>
              Review the examination rules and structure carefully before initiating the timer.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border bg-surface">
                <span className="text-xs text-foreground-muted block mb-1">Time Limit</span>
                <span className="text-2xl font-extrabold text-foreground">{levelInfo.durationMinutes} Mins</span>
                <span className="text-xs text-foreground-secondary block mt-1">Timer auto-submits at 00:00</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface">
                <span className="text-xs text-foreground-muted block mb-1">Total Marks</span>
                <span className="text-2xl font-extrabold text-primary">50 Marks</span>
                <span className="text-xs text-foreground-secondary block mt-1">Passing threshold: 35 Marks (70%)</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface">
                <span className="text-xs text-foreground-muted block mb-1">Format</span>
                <span className="text-2xl font-extrabold text-foreground">14 Questions</span>
                <span className="text-xs text-foreground-secondary block mt-1">3 distinct sections</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                Section Minimum Requirements:
              </h3>
              <ul className="text-sm space-y-2 text-foreground-secondary border border-border rounded-xl p-4 bg-surface">
                <li className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span><strong>Section A:</strong> 10 Multiple-Choice Questions (20 Marks)</span>
                  <Badge variant="default" className="text-xs">Min Required: 10/20</Badge>
                </li>
                <li className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span><strong>Section B:</strong> 2 Coding Challenges (20 Marks)</span>
                  <Badge variant="default" className="text-xs">Min Required: 10/20</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span><strong>Section C:</strong> 2 Teaching & Explanation Scenarios (10 Marks)</span>
                  <Badge variant="default" className="text-xs">Min Required: 5/10</Badge>
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs text-foreground-muted bg-surface-elevated/40 p-4 rounded-xl border border-border">
              <span className="font-bold text-foreground text-sm block mb-1">Assessment Rules:</span>
              <p>• You may navigate freely between questions and mark questions for review before final submission.</p>
              <p>• Coding questions are evaluated against both sample and hidden test cases on a secure server sandbox.</p>
              <p>• Teaching questions are evaluated using a strict multi-criteria pedagogical rubric.</p>
              <p>• If you accidentally refresh the browser, your in-progress answers and elapsed timer will be restored.</p>
              <p>• You must satisfy BOTH the overall 35/50 mark threshold and every individual section minimum to pass.</p>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmedRules}
                onChange={(e) => setConfirmedRules(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground leading-relaxed">
                I confirm that I have read the assessment rules, I am ready to begin my {levelInfo.durationMinutes}-minute examination for <strong>{currentLangObj.name} ({levelInfo.title})</strong>, and understand that passing will earn an independent verified teaching eligibility status.
              </span>
            </label>

            <div className="flex justify-between items-center pt-2">
              <Button variant="ghost" onClick={() => setStep('select_level')}>
                ← Back to Level Selection
              </Button>
              <Button
                variant="primary"
                size="large"
                disabled={!confirmedRules || loading}
                onClick={handleStartTest}
                className="px-8 font-bold text-base flex items-center gap-2"
              >
                {loading ? 'Initializing Assessment...' : 'Start Test Now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
