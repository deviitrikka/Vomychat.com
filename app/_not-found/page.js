"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchQuery />
    </Suspense>
  );
}

function SearchQuery() {
  const searchParams = useSearchParams();
  return <p>Query: {searchParams.get("q")}</p>;
}
