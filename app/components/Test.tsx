// components/Test.tsx
import React from 'react';

export default function Test() {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Font Test Page</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Geist Sans (Default) */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Geist Sans (Default)</h2>
          <p className="text-xl">
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-geist-sans</p>
        </div>

        {/* Geist Mono */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Geist Mono</h2>
          <p className="text-xl font-mono">
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-geist-mono</p>
        </div>

        {/* Josefin Sans - NEW */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Josefin Sans</h2>
          <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)" }}>
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-josefin-sans</p>
        </div>

        {/* Josefin Sans - Different Weights */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Josefin Sans (Weights)</h2>
          <div className="space-y-2">
            <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)", fontWeight: 100 }}>
              Thin 100: The quick brown fox
            </p>
            <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)", fontWeight: 300 }}>
              Light 300: The quick brown fox
            </p>
            <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)", fontWeight: 400 }}>
              Regular 400: The quick brown fox
            </p>
            <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)", fontWeight: 600 }}>
              Semi-Bold 600: The quick brown fox
            </p>
            <p className="text-xl" style={{ fontFamily: "var(--font-josefin-sans)", fontWeight: 700 }}>
              Bold 700: The quick brown fox
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">Font: --font-josefin-sans with different weights</p>
        </div>

        {/* Noto Serif */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Noto Serif</h2>
          <p className="text-xl font-serif">
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-noto-serif</p>
        </div>

        {/* Noto Serif Italic */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Noto Serif (Italic)</h2>
          <p className="text-xl font-serif italic">
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-noto-serif (italic)</p>
        </div>

        {/* Parfumerie Script */}
        <div className="p-6 border rounded-lg border-gray-200 dark:border-gray-800">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Parfumerie Script</h2>
          <p className="text-xl" style={{ fontFamily: "var(--font-parfumerie)" }}>
            The quick brown fox jumps over the lazy dog.
            <br />
            1234567890 !@#$%^&*()
          </p>
          <p className="text-sm text-gray-400 mt-2">Font: --font-parfumerie</p>
        </div>

        {/* Comparison Section */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Font Comparison</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-500">Sans:</span>
              <span className="text-lg">Hello World</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-500">Mono:</span>
              <span className="text-lg font-mono">Hello World</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-500">Josefin:</span>
              <span className="text-lg" style={{ fontFamily: "var(--font-josefin-sans)" }}>Hello World</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-500">Serif:</span>
              <span className="text-lg font-serif">Hello World</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-500">Script:</span>
              <span className="text-lg" style={{ fontFamily: "var(--font-parfumerie)" }}>Hello World</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}