"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Loading: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setLoading(true);

        // Simulate a loading delay (adjust as needed)
        const timer = setTimeout(() => setLoading(false), 500);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
};

export default Loading;
