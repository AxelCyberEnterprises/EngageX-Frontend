"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import engageXModalLogo from "../../../assets/images/pngs/modal-logo.png";
import modalFirstImage from "../../../assets/images/pngs/user-agreement-image-1.png";
import cloudCheck from "../../../assets/images/svgs/cloud-check.svg";
import cloudCheckGray from "../../../assets/images/svgs/cloud-check-gray.svg";
import { Label } from "@/components/ui/label";

function engageXImage() {
  return <img src={engageXModalLogo} alt="EngageX™ Logo" className="w-28" />;
}

export default function MultiStepAgreement({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [agreementState, setAgreementState] = useState({
    initials: "",
    agree: false,
    filePreview: null as string | null,
    canProceed: true,
    industryState: "",
    industryType: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step === 1) onClose();
    else setStep((prev) => prev - 1);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | null = null;

    if (event.type === "change") {
      file =
        (event as React.ChangeEvent<HTMLInputElement>).target.files?.[0] ||
        null;
    } else if (event.type === "drop") {
      file =
        (event as React.DragEvent<HTMLDivElement>).dataTransfer.files?.[0] ||
        null;
    }

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type! Only JPG, PNG, and MP4 are allowed.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert("File size exceeds 3MB limit!");
        return;
      }
      if (file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);
        setAgreementState((prevState) => ({
          ...prevState,
          filePreview: imageURL,
        }));
      } else {
        setAgreementState((prevState) => ({ ...prevState, filePreview: null }));
      }
    }
  };

  const handleConfirm = () => {
    console.log("Final Agreement State:", agreementState);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (step === 6 && !isOpen) onClose();
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className={` ${
          step === 4 || step === 5 || step === 1
            ? "w-[min(100%,25rem)]"
            : "w-[85vw] md:max-w-[50vw]"
        }  my-auto mx-auto  max-md:mt-5 max-md:max-h-[90vh] [&>button]:hidden`}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="max-h-fit">
          {step === 1 && <StepOne />}
          {step === 2 && (
            <StepTwo
              initials={agreementState.initials}
              setInitials={(value) =>
                setAgreementState((prevState) => ({
                  ...prevState,
                  initials: value,
                }))
              }
              agree={agreementState.agree}
              setAgree={(value) =>
                setAgreementState((prevState) => ({
                  ...prevState,
                  agree: value,
                }))
              }
            />
          )}
          {step === 3 && (
            <StepThree
              filePreview={agreementState.filePreview}
              handleFileChange={handleFileChange}
            />
          )}
          {step === 4 && (
            <StepFour
              industryType={agreementState.industryType}
              industryState={agreementState.industryState}
              setIndustryState={(value) =>
                setAgreementState((prevState) => ({
                  ...prevState,
                  industryState: value,
                }))
              }
              setIndustryType={(value) =>
                setAgreementState((prevState) => ({
                  ...prevState,
                  industryType: value,
                }))
              }
            />
          )}
          {step === 5 && <StepFive />}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 font-[Inter] justify-between">
          <Button
            variant="default"
            className={`${
              step === 1
                ? "bg-[rgba(255,0,0,0.1)] text-[#f00]"
                : "bg-white border text-[#344054]"
            } ${
              step > 3 ? "hidden" : ""
            } w-full py-4 h-fit border-[#1018280D] hover:bg-accent rounded-lg`}
            onClick={prevStep}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 5 ? (
            <Button
              className="w-full py-4 h-fit rounded-lg"
              onClick={nextStep}
              disabled={
                (step === 2 &&
                  (!agreementState.agree || agreementState.initials === "")) ||
                (step === 3 && !agreementState.filePreview) ||
                (step === 4 &&
                  (agreementState.industryState === "" ||
                    agreementState.industryType === ""))
              }
            >
              {step === 1 ? "Read Agreement" : step > 3 ? "Confirm" : "Proceed"}
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              className="rounded-lg w-full py-4 h-fit"
              disabled={agreementState.industryState === ""}
            >
              Go to homepage
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StepOne() {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={modalFirstImage} className="w-full" alt="modal-image" />
      <div className="flex gap-2 mx-auto justify-center w-full items-center">
        <p className="sm:text-2xl text-3xl text-nowrap font-[Neue Montreal]">
          Welcome to
        </p>
        <img
          src={engageXModalLogo}
          className="h-[1.7rem] sm:h-[1.7rem] mt-[0.45rem] lg:mt-[0.3rem] w-auto"
          alt=""
        />
      </div>
      <p className="text-center text-sm font-[Montserrat] -mt-3 mb-3 text-muted-foreground">
        Please review & accept our user agreement.
      </p>
    </div>
  );
}

function StepTwo({
  initials,
  setInitials,
  agree,
  setAgree,
}: {
  initials: string;
  setInitials: (value: string) => void;
  agree: boolean;
  setAgree: (value: boolean) => void;
}) {
  return (
    <div className="pr-2">
      <article
        // ref={agreementRef}
        // onScroll={handleScroll}
        className="text-[#101828] overflow-y-scroll max-md:pr-2 md:h-[55vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-[50vh]  flex flex-col gap-2 font-medium text-sm  font-[montserrat]"
      >
        {engageXImage()}
        <p className="font-semibold">Welcome to EngageX™!</p>
        <p>
          By using our platform, you acknowledge that you have read, understood,
          and agreed to this User-Level Agreement (ULA), which governs your
          access and use of our AI-powered public speaking and presentation
          practice environment.
        </p>
        <p>
          By clicking “I Agree” and providing your initials, you confirm your
          acceptance of these terms.
        </p>
        <div>
          <div className="font-[montserrat]">
            <p>
              <strong>Effective Date:</strong> 03/27/2025
            </p>

            <p className="my-4">1. Introduction</p>
            <p className="leading-7">
              Welcome to EngageX™. Your privacy is important to us. This Privacy
              Policy explains how we collect, use, and protect your personal
              information when you use our AI-powered public speaking and
              presentation training platform.
            </p>

            <p className="my-4">2. Information We Collect</p>
            <p>When using EngageX™, we may collect:</p>
            <ul className="list-disc leading-7">
              <li>
                <strong>Personal Information:</strong> Name, email address, and
                account details.
              </li>
              <li>
                <strong>Session Data:</strong> Audio analysis for AI-driven
                feedback (not stored beyond 24 hours).
              </li>
              <li>
                <strong>Usage Information:</strong> Browser type, device
                information, and interaction data for improving user experience.
              </li>
            </ul>

            <p className="my-4">3. How We Use Your Information</p>
            <ul className="list-disc leading-7">
              <li>Provide AI-generated feedback on speech performance.</li>
              <li>Improve platform accuracy and user experience.</li>
              <li>
                Enable users to download session recordings for personal review.
              </li>
              <li>Ensure compliance with security and legal obligations.</li>
            </ul>

            <p className="my-4">4. Data Storage & Security</p>
            <ul className="list-disc leading-7">
              <li>
                EngageX™ does not permanently store your session recordings.
              </li>
              <li>
                All session recordings are deleted after 24 hours unless
                downloaded.
              </li>
              <li>
                We use encryption and security measures to protect your data.
              </li>
            </ul>

            <p className="my-4">5. Sharing & Third-Party Access</p>
            <p>
              EngageX™ does not sell or share personal data with third parties
              except:
            </p>
            <ul className="list-disc leading-7">
              <li>
                When legally required (e.g., government or law enforcement
                requests).
              </li>
              <li>To comply with fraud prevention and security monitoring.</li>
            </ul>

            <p className="my-4">6. Your Rights & Control</p>
            <ul className="list-disc leading-7">
              <li>
                <strong>Access & Deletion:</strong> You can request access to
                your stored personal data or its deletion.
              </li>
              <li>
                <strong>Session Recordings:</strong> Once downloaded, EngageX™
                is not responsible for security breaches or misuse.
              </li>
            </ul>

            <p className="my-4">7. Updates to Privacy Policy</p>
            <p className="leading-7">
              We may update this Privacy Policy from time to time. Continued use
              of EngageX™ signifies acceptance of any revisions.
            </p>

            <p className="my-4">8. Contact Us</p>
            <p className="leading-7">
              For any privacy-related concerns, please contact{" "}
              <a href="mailto:info@engagexai.io">info@engagexai.io</a>.
            </p>
          </div>
        </div>

        <p className="font-semibold font-[Montserrat]">
          Agreement & Acceptance
        </p>
        <div className="font-medium font-[montserrat]">
          <p>By checking "I Agree" and entering your initials, you confirm:</p>
          <ul className="leading-7">
            <li>✔ You understand and accept EngageX™'s policies.</li>
            <li>✔ You acknowledge session data is deleted after 24 hours.</li>
            <li>✔ You take full responsibility for downloaded recordings.</li>
          </ul>
        </div>
        <div>
          <label htmlFor="initials" className="font-[Inter]">
            Enter initials here
          </label>
          <Input
            placeholder="Enter your initials"
            className="text-black text-base font-normal mt-1 font-[Inter]"
            value={initials}
            id="initials"
            onChange={(e) => setInitials(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            className="border-2 p-2 border-gray-300 rounded-md checked:bg-transparent bg-transparent data-[state=checked]:bg-transparent data-[state=checked]:text-black"
            checked={agree}
            onCheckedChange={(checked) => setAgree(checked as boolean)}
            id="terms"
          />
          <label
            className="font-[Inter] text-[#344054] font-medium"
            htmlFor="terms"
          >
            I agree to the terms and conditions
          </label>
        </div>
        <p className="mt-2">
          By clicking “I Agree” and providing your initials, you confirm your
          acceptance of these terms.
        </p>
      </article>
    </div>
  );
}

function StepThree({
  filePreview,
  handleFileChange,
}: {
  filePreview: string | null;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e);
  };
  return (
    <div className="flex flex-col font-medium font-[montserrat] items-center overflow-hidden gap-1">
      <img src={cloudCheck} alt="checkSvg" />
      <p className="text-base">Upload Picture</p>
      <p className="text-muted-foreground text-sm text-center">
        Upload your picture for easy identification.
      </p>
      <div
        className={`relative overflow-hidden p-4 border-gray-300 border-dashed min-h-[40vh] h-fit flex gap-1 flex-col items-center justify-center border-2 rounded-lg w-full ${
          isDragging ? "bg-gray-100" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {filePreview && (
          <img
            src={filePreview}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Preview"
          />
        )}
        <img src={cloudCheckGray} className="mb-2" alt="checkSvg" />
        <p className="text-sm">Choose a file or drag & drop it here</p>
        <p className="text-muted-foreground text-[12px] text-center">
          JPEG, PNG, and MP4 formats, up to 3MB
        </p>
        <input
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, video/mp4"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          className="text-black text-sm"
          onClick={() =>
            (document.querySelector(
              "input[type=file]"
            ) as HTMLInputElement)?.click()
          }
        >
          Browse File
        </Button>
      </div>
    </div>
  );
}

function StepFour({
  industryType,
  industryState,
  setIndustryState,
  setIndustryType,
}: {
  industryType: string;
  industryState: string;
  setIndustryState: (value: string) => void;
  setIndustryType: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <img src={cloudCheck} className="mx-auto" alt="checkSvg" />
      <p className="mx-auto font-medium font-[montserrat] text-base">
        Select Industry
      </p>
      <p className="text-muted-foreground mx-auto font-[montserrat] text-sm text-center">
        Choose your industry and input your <br /> company name
      </p>
      <div className="relative w-full my-5">
        <label htmlFor="industry type">Choose your type of industry</label>
        <select
          name="industry type"
          value={industryType}
          onChange={(e) => setIndustryType(e.target.value)}
          className="font-normal py-2 my-2 w-full font-[Inter]"
          id="industry type"
        >
          <option className="text-gray-300" value="">
            Choose industry type
          </option>
          <option value="finance_banking">Finance & Banking</option>
          <option value="marketing_advertising">Marketing & Advertising</option>
          <option value="healthcare_pharmaceuticals">
            Healthcare & Pharmaceuticals
          </option>
          <option value="engineering_manufacturing">
            Engineering & Manufacturing
          </option>
          <option value="media_entertainment">Media & Entertainment</option>
          <option value="law_government">Law & Government</option>
          <option value="technology_software_development">
            Technology & Software Development
          </option>
          <option value="retail_ecommerce">Retail & E-Commerce</option>
          <option value="hospitality_tourism">Hospitality & Tourism</option>
          <option value="major_league_sports_athlete">
            Major League Sports Athlete
          </option>
          <option value="major_league_sports_executive">
            Major League Sports Executive
          </option>
          <option value="production">Production</option>
          <option value="others">Others</option>
        </select>
      </div>

      <Label htmlFor="company-name">Enter company name here</Label>
      <Input
        placeholder="Enter company name"
        id="company-name"
        className="text-black font-normal mt-1 font-[Inter]"
        value={industryState}
        onChange={(e) => setIndustryState(e.target.value)}
      />
    </div>
  );
}

function StepFive() {
  return (
    <div className="flex flex-col font-medium font-[montserrat] items-center overflow-hidden gap-1">
      <div className="flex gap-2 mx-auto justify-center w-full items-center">
        <p className="sm:text-2xl text-3xl text-nowrap font-medium font-[Neue Montreal]">
          Welcome to
        </p>
        <img
          src={engageXModalLogo}
          className="h-[1.7rem] sm:h-[1.7rem] mt-[0.45rem] lg:mt-[0.3rem] w-auto"
          alt=""
        />
      </div>
      <p className="text-center leading-7 my-2">
        You’ve finally completed the user level agreement, you can now proceed
        to the dashboard homepage
      </p>
    </div>
  );
}
