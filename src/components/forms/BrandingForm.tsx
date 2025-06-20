import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContext";
import { useFullUserProfile, useUpdateUserProfile } from "@/hooks/settings";
import { cn } from "@/lib/utils";
import { BrandingSchema } from "@/schemas/branding-schema";
import { RootState, useAppDispatch } from "@/store";
import { IBrandingState, setColors, setPreviews } from "@/store/slices/brandingSlice";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import ControlledFieldWrapper from "../controlled-fields/field-wrapper";
import CnameSetupHelp from "../dialogs/dialog-contents/CnameSetupHelp";
import EmptyState from "../empty-state";
import { Button } from "../ui/button";
import ErrorToast from "../ui/custom-toasts/error-toast";
import SuccessToast from "../ui/custom-toasts/success-toasts";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import UploadMediaTrigger from "../widgets/UploadMediaTrigger";

type IBrandingFormProps = React.ComponentProps<"form">;
export type FormType = z.infer<typeof BrandingSchema>;

const brandingUploadSections = [
    {
        name: "logo",
        label: "Company Logo: (file type .png/.svg)",
        accept: { "image/png": [".png"], "image/svg+xml": [".svg"] },
    },
    {
        name: "favicon",
        label: "Favicon: (file type .ico/.png/.svg)",
        accept: { "image/vnd.microsoft.icon": [".ico"], "image/png": [".png"], "image/svg+xml": [".svg"] },
    },
] as const;

const brandingColorsSections = [
    {
        name: "primary_color",
        label: "Primary Color (applies to header, buttons, links)",
    },
    {
        name: "secondary_color",
        label: "Secondary Color (applies to sidebar, highlights, badges)",
    },
] as const;

const BrandingForm = ({ className }: IBrandingFormProps) => {
    const { theme } = useTheme(); // Assuming useTheme is used for theming purposes, but not utilized in this component

    const { data: fullProfile } = useFullUserProfile();
    const { mutate: updateProfile, isPending } = useUpdateUserProfile(fullProfile?.results?.[0]?.id);

    const { previews } = useSelector((state: RootState) => state.branding);
    const dispatch = useAppDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(BrandingSchema),
        defaultValues: useMemo(
            () => ({ primary_color: theme.primaryColor, secondary_color: theme.secondaryColor }),
            [theme.primaryColor, theme.secondaryColor],
        ),
    });
    const companyLogo = useWatch({ control: form.control, name: "logo" });
    const favicon = useWatch({ control: form.control, name: "favicon" });
    const primaryColor = useWatch({ control: form.control, name: "primary_color" });
    const secondaryColor = useWatch({ control: form.control, name: "secondary_color" });

    const handleColorInputClick = useCallback((name: "primary_color" | "secondary_color") => {
        const colorInput = document.getElementById(name) as HTMLInputElement | null;

        if (colorInput) {
            colorInput.select();
        }
    }, []);

    const handleDelete = useCallback(
        (name: "logo" | "favicon") => {
            const previewName = name === "logo" ? "companyLogoPreview" : "faviconPreview";

            form.setValue(name, undefined);

            dispatch(
                setPreviews({
                    ...previews,
                    [previewName]: "",
                }),
            );
        },
        [dispatch, form, previews],
    );

    const handleSubmit = useCallback(
        (values: FormType) => {
            const formData = new FormData();
            formData.append("primary_color", values.primary_color!);
            formData.append("secondary_color", values.secondary_color!);

            if (values.logo && values.logo[0]) {
                formData.append("logo", values.logo[0]);
            }
            if (values.favicon && values.favicon[0]) {
                formData.append("favicon", values.favicon[0]);
            }

            updateProfile(formData, {
                onSuccess: () => {
                    dispatch(setPreviews({ companyLogoPreview: "", faviconPreview: "" }));
                    toast(
                        <SuccessToast
                            heading="Branding changes saved successfully"
                            description="You may need to refresh the browser or clear cache to see changes."
                        />,
                    );
                },
                onError: (error) => {
                    console.error("Error updating branding: ", error);
                    toast(
                        <ErrorToast
                            heading="Error Updating Branding"
                            description="An error occurred while updating your branding settings. Please try again."
                        />,
                    );
                },
            });
        },
        [dispatch, updateProfile],
    );

    useEffect(() => {
        const previews = {
            companyLogoPreview: companyLogo && companyLogo[0] ? URL.createObjectURL(companyLogo[0]) : "",
            faviconPreview: favicon && favicon[0] ? URL.createObjectURL(favicon[0]) : "",
        } as IBrandingState["previews"];

        // Update the Redux store with the new previews
        dispatch(setPreviews(previews));

        // Clean up object URLs to avoid memory leaks
        return () => {
            if (companyLogo && companyLogo[0]) URL.revokeObjectURL(previews.companyLogoPreview);
            if (favicon && favicon[0]) URL.revokeObjectURL(previews.faviconPreview);
        };
    }, [companyLogo, dispatch, favicon, form]);

    useEffect(() => {
        dispatch(
            setColors({
                primaryColor: primaryColor || "#10161E",
                secondaryColor: secondaryColor || "#0C76D5",
            }),
        );
    }, [dispatch, primaryColor, secondaryColor]);

    return (
        <Form {...form}>
            <form className={cn("md:px-2 pb-8", className)} onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="lg:w-auto md:w-4/5 w-full">
                    <h3 className="text-lg mb-4">Branding Uploads Section</h3>

                    <div className="flex md:flex-row flex-col items-center gap-4 mb-5">
                        {brandingUploadSections.map((section) => (
                            <div key={section.name} className="flex flex-col gap-2 w-full">
                                <span className="text-sm font-medium">{section.label}</span>
                                <div className="flex flex-col items-center">
                                    <div className="md:h-25 h-35 w-full rounded-t-sm border-x border-t border-light-silver overflow-hidden">
                                        {previews.companyLogoPreview && section.name === "logo" ? (
                                            <img
                                                src={previews.companyLogoPreview}
                                                alt=""
                                                className="size-full object-cover"
                                            />
                                        ) : previews.faviconPreview && section.name === "favicon" ? (
                                            <img
                                                src={previews.faviconPreview}
                                                alt=""
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <EmptyState
                                                text={`Upload ${section.name === "logo" ? "company logo" : "favicon"}`}
                                                className="size-full [&_img]:w-12 gap-0 text-xs rounded-none"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center w-full">
                                        <UploadMediaTrigger
                                            name={section.name}
                                            accept={section.accept}
                                            className="w-1/2"
                                        >
                                            <Button
                                                type="button"
                                                className="w-full h-10 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] rounded-none rounded-bl-sm border border-light-silver"
                                            >
                                                <Download className="size-4" />
                                                Change
                                            </Button>
                                        </UploadMediaTrigger>
                                        <Button
                                            type="button"
                                            className="w-1/2 h-10 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] rounded-none rounded-br-sm border-y border-r border-light-silver"
                                            onClick={() => handleDelete(section.name)}
                                        >
                                            <Trash2 className="size-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-2">
                        <ControlledFieldWrapper
                            control={form.control}
                            name="domain"
                            label="Enter Company Custom Domain"
                            className="[&_[data-slot='form-label']]:font-normal"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="portal.yourbrand.com"
                                    className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus"
                                />
                            )}
                        />
                        <span
                            className="md:inline hidden text-secondary hover:text-secondary text-sm underline underline-offset-2 cursor-pointer w-fit"
                            onClick={() =>
                                dispatch(openDialog({ key: "cname-setup-help", children: <CnameSetupHelp /> }))
                            }
                        >
                            How do I set up my CNAME?
                        </span>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <span className="md:hidden inline text-secondary hover:text-secondary text-sm underline underline-offset-2 cursor-pointer w-fit">
                                    How do I set up my CNAME?
                                </span>
                            </DrawerTrigger>
                            <DrawerContent className="border-bright-gray data-[vaul-drawer-direction=bottom]:rounded-t-2xl data-[vaul-drawer-direction=bottom]:px-6 data-[vaul-drawer-direction=bottom]:pb-12">
                                <DrawerHeader className="sr-only">
                                    <DrawerTitle>CNAME Setup Help</DrawerTitle>
                                    <DrawerDescription>CNAME Setup Help</DrawerDescription>
                                </DrawerHeader>
                                <CnameSetupHelp />
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg mb-4">Brand Colors Section</h3>

                    <div className="space-y-6">
                        {brandingColorsSections.map(({ label, name }) => (
                            <ControlledFieldWrapper
                                key={name}
                                control={form.control}
                                name={name}
                                label={label}
                                className="[&_[data-slot='form-label']]:font-normal"
                                render={({ field }) => (
                                    <div className="relative md:size-fit flex items-center">
                                        <HexColorInput
                                            {...field}
                                            id={name}
                                            color={field.value}
                                            onClick={() => handleColorInputClick(name)}
                                            className="h-10 md:w-fit text-[#6F7C8E] font-medium placeholder:text-auro-metal-saurus"
                                        />
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <div
                                                    className="absolute right-4 size-5 rounded-sm bgblack"
                                                    style={{
                                                        backgroundColor:
                                                            name === "primary_color" ? primaryColor : secondaryColor,
                                                    }}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 md:mr-0 mr-4 size-fit border-none">
                                                <HexColorPicker {...field} color={field.value} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center md:justify-end gap-2">
                    <Button
                        type="button"
                        disabled={isPending}
                        variant="outline"
                        className="h-10 md:w-auto w-full text-gunmetal hover:text-gunmetal font-normal border-gunmetal"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} isLoading={isPending} className="h-10 md:w-auto w-full">
                        Save Branding
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default BrandingForm;
