import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManualEntrySchema } from "@/schemas/dashboard/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFieldWrapper from "../../controlled-fields/field-wrapper";
import { Separator } from "../../ui/separator";
import SuccessToast from "@/components/ui/custom-toasts/success-toasts";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { toast } from "sonner";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateEnterpriseUser } from "@/hooks/organization/useCreateEnterpriseUser";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchSingleOrganization } from "@/hooks";

type FormType = z.infer<typeof ManualEntrySchema>;

const ManualEntryForm = () => {
    const [searchParams] = useSearchParams();
    const enterpriseId = searchParams.get("id") ?? "";
    const queryClient = useQueryClient();
    const { mutate: createUser, isPending } = useCreateEnterpriseUser();

    // Auto-determine user_type based on enterprise_type
    const form = useForm<FormType>({
        resolver: zodResolver(ManualEntrySchema),
        defaultValues: {
            members: [{ first_name: "", last_name: "", email: "", role: "", team: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "members",
    });
    const { data: organization } = useFetchSingleOrganization(+enterpriseId);

    const handleSubmit = useCallback(
        (values: FormType) => {
            values.members.forEach((member) => {
                // Auto-determine user_type based on enterprise_type
                const autoUserType = organization?.enterprise_type === "general" ? "general" : "rookie";

                createUser(
                    {
                        enterprise: +enterpriseId,
                        role: member.role,
                        team: member.team,
                        email: member.email,
                        first_name: member.first_name,
                        last_name: member.last_name,
                        user_type: autoUserType,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["enterprise-users", 1, +enterpriseId] });
                            toast(
                                <SuccessToast
                                    heading="User created successfully"
                                    description={`${member.email} has been updated`}
                                />,
                            );
                        },
                        onError: (error) => {
                            console.error("Error updating user: ", error);

                            // Check if error is due to duplicate user
                            const errorMessage = error.message || JSON.stringify(error);
                            const isDuplicateUser =
                                errorMessage.includes("duplicate key value violates unique constraint") &&
                                errorMessage.includes("enterprise_enterpriseuser_user_id_key");

                            toast(
                                <ErrorToast
                                    heading={isDuplicateUser ? "Member Already Exists" : "Error Creating User"}
                                    description={
                                        isDuplicateUser
                                            ? `${member.email} is already a member of this organization`
                                            : `Failed to update ${member.email}`
                                    }
                                />,
                            );
                        },
                    },
                );

                form.reset();
            });
        },
        [createUser, enterpriseId, organization, queryClient, form],
    );

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-4 max-h-100 overflow-auto hide-scrollbar rounded-[10px]">
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <div className="bg-[#F8F9FC] rounded-[10px] border border-bright-gray p-4">
                                <div className="flex items-end gap-4">
                                    <div className="grid grid-cols-5 gap-4 w-full">
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.first_name`}
                                            label="First Name"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter first name"
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                />
                                            )}
                                        />
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.last_name`}
                                            label="Last Name"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter last name"
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                />
                                            )}
                                        />
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.email`}
                                            label="Email"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter email"
                                                    type="email"
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                />
                                            )}
                                        />
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.role`}
                                            label="Role"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter role"
                                                    type="text"
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                />
                                            )}
                                        />
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.team`}
                                            label="Team"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter team"
                                                    type="text"
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                />
                                            )}
                                        />
                                        {/*<ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.user_type`}
                                            label="User Type"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-gray-blue"
                                                >
                                                    <option value="rookie">Rookie</option>
                                                    <option value="general">General</option>
                                                </select>
                                            )}
                                        />*/}
                                    </div>
                                    {fields.length > 1 && (
                                        <Button
                                            aria-label="Remove user"
                                            type="button"
                                            variant="ghost"
                                            className="bg-transparent text-crimson-red hover:text-crimson-red size-8 rounded-full mb-1"
                                            onClick={() => remove(index)}
                                        >
                                            <X />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <Separator className="data-[orientation=horizontal]:w-3/5 bg-bright-gray" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <Button
                        type="submit"
                        variant="outline"
                        className="text-primary-blue"
                        onClick={() =>
                            append({
                                first_name: "",
                                last_name: "",
                                email: "",
                                role: "member",
                                team: "team_a",
                            })
                        }
                    >
                        <Plus />
                        New User
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-[#64BA9F] hover:bg-[#64BA9F]/90">
                        <Upload />
                        Add Members
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ManualEntryForm;
