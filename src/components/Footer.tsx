import React from 'react';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-card-border bg-surface/50 mt-12">
            <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
                <div>
                    © {year} ResumeBuilder. All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/login" className="hover:underline">Login</a>
                    <a href="/signup" className="hover:underline">Sign up</a>
                </div>
            </div>
        </footer>
    );
};


