import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, ReactNode } from 'react';

interface CarouselProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    sectionId: string;
}

export function Carousel({ title, icon, children, sectionId }: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id={sectionId} className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nippon-red/20 to-sakura/20 flex items-center justify-center text-sakura">
                                {icon}
                            </div>
                        )}
                        <h2 className="section-title mb-0">{title}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="carousel-container">
                    {children}
                </div>
            </div>
        </section>
    );
}
