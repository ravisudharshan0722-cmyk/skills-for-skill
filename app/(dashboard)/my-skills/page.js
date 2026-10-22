import Link from "next/link";
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useUser } from "../../../lib/user-context";

export default function MySkillsPage() {
  const { currentUser, addOffer, removeOffer, addNeed, removeNeed } = useUser();
  const [newOffer, setNewOffer] = useState("");
  const [newNeed, setNewNeed] = useState("");

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (newOffer.trim()) {
      addOffer(newOffer.trim());
      setNewOffer("");
    }
  };

  const handleAddNeed = (e) => {
    e.preventDefault();
    if (newNeed.trim()) {
      addNeed(newNeed.trim());
      setNewNeed("");
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Skills</h1>
          <p className="text-foreground-secondary mt-1">Manage the skills you want to teach and learn.</p>
        </div>
      </div>

            {/* AI Teaching Eligibility Test Promotion Card */}
      <Card className="border border-primary/30 bg-primary-soft/20 shadow-sm">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
              ★
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Earn Verified Teaching Eligibility</h2>
              <p className="text-xs text-foreground-secondary mt-0.5">
                Take our 14-question AI-powered examination to earn level-specific verified teacher badges for Java, Python, JavaScript, and more.
              </p>
            </div>
          </div>
          <Button as={Link} href="/teaching-test" variant="primary" size="small" className="w-full sm:w-auto font-semibold whitespace-nowrap">
            Take Eligibility Test
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle as="h2">Skills I Can Teach</CardTitle>
            <CardDescription>What you are offering to the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOffer} className="flex gap-2 mb-6">
              <Input 
                placeholder="e.g. React, UI Design..." 
                value={newOffer}
                onChange={(e) => setNewOffer(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="primary">Add</Button>
            </form>
            <ul className="space-y-4">
              {(currentUser?.offers || []).length > 0 ? (
                currentUser.offers.map(skill => (
                  <li key={skill} className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-border-strong transition-colors">
                    <span className="font-medium text-foreground">{skill}</span>
                    <Button 
                      variant="ghost" 
                      size="small" 
                      className="text-error hover:text-error hover:bg-error-soft"
                      onClick={() => removeOffer(skill)}
                    >
                      Remove
                    </Button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-foreground-secondary text-center py-4">No skills added yet.</p>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h2">Skills I Want to Learn</CardTitle>
            <CardDescription>What you are looking for in an exchange.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNeed} className="flex gap-2 mb-6">
              <Input 
                placeholder="e.g. Next.js, Python..." 
                value={newNeed}
                onChange={(e) => setNewNeed(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="primary">Add</Button>
            </form>
            <ul className="space-y-4">
              {(currentUser?.needs || []).length > 0 ? (
                currentUser.needs.map(skill => (
                  <li key={skill} className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-border-strong transition-colors">
                    <span className="font-medium text-foreground">{skill}</span>
                    <Button 
                      variant="ghost" 
                      size="small" 
                      className="text-error hover:text-error hover:bg-error-soft"
                      onClick={() => removeNeed(skill)}
                    >
                      Remove
                    </Button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-foreground-secondary text-center py-4">No skills requested yet.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
