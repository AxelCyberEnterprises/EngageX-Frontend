import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ManualEntrySchema } from "@/schemas/dashboard/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFieldWrapper from "../../controlled-fields/field-wrapper";
import { Separator } from "../../ui/separator";

type FormType = z.infer<typeof ManualEntrySchema>;

const roleOptions = [
    { name: "Admin", value: "admin" },
    { name: "Member", value: "member" },
];
const teamOptions = [
    { name: "Team A", value: "team_a" },
    { name: "Team B", value: "team_b" },
];

const ManualEntryForm = () => {
    const form = useForm<FormType>({
        resolver: zodResolver(ManualEntrySchema),
        defaultValues: {
            members: [{ first_name: "", last_name: "", email: "", role: "admin", team: "team_a" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "members",
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit((data) => console.log(data))}>
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
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-foreground data-[placeholder]:text-gray-blue [&_svg:not([class*='text-'])]:text-auro-metal-saurus [&_svg]:opacity-100">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-none">
                                                        {roleOptions.map(({ name, value }, index) => (
                                                            <SelectItem
                                                                key={value + index}
                                                                value={value}
                                                                className="h-10"
                                                            >
                                                                {name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <ControlledFieldWrapper
                                            control={form.control}
                                            name={`members.${index}.team`}
                                            label="Team"
                                            className="[&_[data-slot='form-label']]:text-primary-blue"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger className="h-10 rounded-lg focus-visible:ring-0 shadow-none text-foreground data-[placeholder]:text-gray-blue [&_svg:not([class*='text-'])]:text-auro-metal-saurus [&_svg]:opacity-100">
                                                        <SelectValue placeholder="Select team" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-none">
                                                        {teamOptions.map(({ name, value }, index) => (
                                                            <SelectItem
                                                                key={value + index}
                                                                value={value}
                                                                className="h-10"
                                                            >
                                                                {name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
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
                        type="button"
                        variant="outline"
                        className="text-primary-blue"
                        onClick={() =>
                            append({ first_name: "", last_name: "", email: "", role: "member", team: "team_a" })
                        }
                    >
                        <Plus />
                        New User
                    </Button>
                    <Button type="submit" className="bg-[#64BA9F] hover:bg-[#64BA9F]/90">
                        <Upload />
                        Add Members
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ManualEntryForm;
