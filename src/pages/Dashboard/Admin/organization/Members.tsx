import MembersTable from "@/components/tables/members-table";

const Members = () => {
    return (
        <section className="px-4 py-3 flex flex-col gap-y-6">
            <h6>Members</h6>
            <MembersTable />
        </section>
    );
};

export default Members;
