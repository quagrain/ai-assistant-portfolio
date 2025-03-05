import Link from "next/link";

interface BottomCardProps {
    header: string;
    details: string;
    left_button: string;
    right_button: string;
}

export default function BottomCard({ header, details, left_button, right_button }: BottomCardProps) {
    return <div
        className="flex flex-col items-center justify-center gap-6 rounded-lg bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-8 text-center">
        <h3 className="text-2xl font-bold">
            {header}
        </h3>
        <p className="max-w-md text-muted-foreground">
            {details}
        </p>
        <div className="flex gap-4">
            <Link href="/projects">
                <button
                    className="rounded-md bg-primary px-6 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
                    {left_button}
                </button>
            </Link>
            <Link href="/social">
                <button
                    className="rounded-md border border-input bg-secondary/70 text-primary-foreground px-6 py-2 transition-colors">
                    {right_button}
                </button>
            </Link>
        </div>
    </div>;
}