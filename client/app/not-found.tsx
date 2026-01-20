import { ErrorDisplay } from "@/components/ui/error-display"

export default function NotFound() {
    return (
        <ErrorDisplay
            type="404"
            title="404 - Page Not Found"
            message="Oops! It seems like you've wandered into an uncharted territory. The page you're looking for doesn't exist or has been moved."
            showBack={true}
            showHome={true}
        />
    )
}
