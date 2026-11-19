import React from "react";

interface PhoneFrameProps {
    src: string;
    alt: string;
    caption?: string;
    /** Load immediately instead of lazily (use for the image in the hero). */
    eager?: boolean;
    className?: string;
}

/**
 * Shows a real app screenshot inside a simple phone outline.
 * The screenshots are 750x1624, so width/height keep the layout stable
 * while they load.
 */
const PhoneFrame: React.FC<PhoneFrameProps> = ({
    src,
    alt,
    caption,
    eager = false,
    className = "",
}) => {
    return (
        <figure className={`mx-auto w-full max-w-[260px] ${className}`}>
            <div className="rounded-[2.25rem] border border-slate-600/70 bg-slate-950 p-2 shadow-2xl shadow-purple-950/60">
                <img
                    src={src}
                    alt={alt}
                    width={750}
                    height={1624}
                    loading={eager ? "eager" : "lazy"}
                    className="h-auto w-full rounded-[1.75rem]"
                />
            </div>
            {caption && (
                <figcaption className="mt-4 text-center text-sm text-gray-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

export default PhoneFrame;
