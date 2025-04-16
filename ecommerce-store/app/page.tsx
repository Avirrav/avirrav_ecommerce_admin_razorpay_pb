'use client';

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState('');

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[700px] space-y-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Avirrav E-Commerce Store</h1>
        <p className="text-xl text-center text-neutral-500">Enter a store username to visit a specific store</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="avirrav"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <Link href={username ? `/${username}` : "/avirrav"}>
          <Button>
            Visit {username ? `${username}'s` : 'Avirrav'} Store
          </Button>
        </Link>
      </div>
    </Container>
  );
}