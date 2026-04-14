import "@/index.css";

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Index from "@/pages/Index";

describe("homepage redesign", () => {
  test("keeps the redesigned homepage headline, trust signals, and CTAs", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /lej en soundboks go/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book nu/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /se priser/i }).length).toBeGreaterThan(0);

    expect(screen.getAllByText(/fra 150 kr\/dag/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/ingen depositum/i)).toBeInTheDocument();
    expect(screen.getAllByText(/levering i aalborg/i).length).toBeGreaterThan(0);
  });
});
