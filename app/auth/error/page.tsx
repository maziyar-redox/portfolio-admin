import { ErrorMessage } from "../_components/error";

export default function ErrorPage() {
    return (
        <>
            <ErrorMessage
                message="An unexpected error happend! contact site admin"
            />
        </>
    );
};