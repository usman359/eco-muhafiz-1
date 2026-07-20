import CaseStudyForm from '@/components/admin/CaseStudyForm';

export default function NewCaseStudyPage() {
  return (
    <>
      <div className="admin-page-header">
        <h1>New case study</h1>
      </div>
      <div className="admin-card">
        <CaseStudyForm />
      </div>
    </>
  );
}
