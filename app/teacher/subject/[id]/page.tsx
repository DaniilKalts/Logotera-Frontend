import DefaultLayout from "@/app/(default)/layout";
import SubjectDetailsClient from "./SubjectDetailsClient";

export default function SubjectDetailsPage({
        params,
        searchParams,
    }: {
    params: { id: string };
    searchParams: Record<string, unknown>;
}) {
    return (
        <DefaultLayout>
            <SubjectDetailsClient />
        </DefaultLayout>
    );
}
