"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function Contact() {
const [subject, setSubject] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, email, message }),
        });
        if (!res.ok) throw new Error("Erreur lors de l'envoi");
        setStatus("success");
        setSubject("");
        setEmail("");
        setMessage("");
    } catch (err) {
        setStatus("error");
        console.error("Erreur lors de l'envoi du message", err);
    }
};

return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-lg space-y-2 p-8">
        <h1 className="text-2xl font-bold">Contactez-nous</h1>
        <p className="text-sm">N’hésitez pas à nous faire part de toute information utile, suggestion d’amélioration, ajout de nouveaux outils ou correction d’éventuelles erreurs ;
             votre retour nous aide à enrichir et fiabiliser Stackuracy pour toute la communauté !
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Votre e-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet de votre message"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message ici…"
            />
          </div>
          <Button type="submit" disabled={status === "loading"} className="cursor-pointer">
            {status === "loading" ? "Envoi…" : "Envoyer"}
          </Button>
          {status === "success" && (
            <p className="text-green-600 text-sm">Message envoyé avec succès ! </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">Erreur lors de l’envoi.</p>
          )}
        </form>
      </Card>
    </div>
  );
}