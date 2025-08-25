import { cn } from "@/libs/utils";
import { useEffect, type ReactNode } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    className?: string;
}


export function Modal({ isOpen, onClose, children, className }: Props) {

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
    
        return () => {
          document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return <></>;
    return (
        <>
            <div 
                className="fixed top-0 left-0 z-20 w-full h-screen backdrop-blur bg-slate-950/10" 
                onClick={onClose} 
            />

            <div 
                className={cn(
                    "fixed top-1/2 left-1/2 -translate-1/2 z-30 bg-white shadow rounded-xl w-11/12 sm:w-fit sm:min-w-md p-4 sm:p-8 h-11/12 overflow-y-auto", 
                    className
                )}
            >
                {children}
            </div>
        </>
    )
}