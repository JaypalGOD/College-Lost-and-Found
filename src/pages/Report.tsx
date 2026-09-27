import { useSearchParams } from "react-router-dom";
import { ReportItemForm } from "@/components/report/ReportItemForm";
import { PageHeader } from "./PageHeader";

export default function Report() {
  const [params] = useSearchParams();
  const found = params.get("type") === "found";
  return (
    <>
      <PageHeader
        eyebrow={found ? "Report found item" : "Report lost item"}
        title={found ? "Thanks for helping out." : "Let's find it together."}
        description={
          found
            ? "Tell us what you found and where. The owner can message you privately — your contact details stay hidden."
            : "Describe what you lost. We'll show it to the campus and check it against items people have already found."
        }
      />
      <div className="container pb-16">
        <ReportItemForm />
      </div>
    </>
  );
}
