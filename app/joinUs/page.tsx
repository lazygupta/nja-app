"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

type FormState = Record<string, string>;

export default function JoinPage() {
  const [form, setForm] = useState<FormState>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook this to an API route
    console.log("Form submitted", form);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top header / breadcrumb (optional) */}
      {/* <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            Join Us
          </h1>
          <p className="text-sm text-muted-foreground">
            Home <span className="mx-1 text-border">/</span> Join Us
          </p>
        </div>
      </section> */}

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-6">
        {/* Red warning bar from original design */}
        <Alert className="border-destructive/60 bg-destructive/5 text-foreground">
          <AlertTitle className="font-semibold">
            WHILE FILLING FORM MAKE SURE THAT YOU HAVE:
          </AlertTitle>
          <AlertDescription className="text-sm mt-1">
            Aadhar / Voter ID card, recent photo, signature, UG certificate &
            character certificate.
          </AlertDescription>
        </Alert>

        <section className="grid gap-8 md:grid-cols-3">
          {/* LEFT — FORM */}
          <Card className="md:col-span-2 border-destructive/40 bg-card shadow-sm">
            <CardHeader className="space-y-4">
              <CardTitle className="text-center uppercase tracking-wide">
                New Member Register Here
              </CardTitle>
              <Button
                variant="outline"
                className="w-full border-primary text-primary font-semibold"
              >
                REGISTERED MEMBER CLICK HERE FOR LOGIN
              </Button>
              <CardDescription className="text-xs text-center text-muted-foreground">
                Fields marked with * are mandatory.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* MEMBERSHIP TYPE */}
                <div className="space-y-2">
                  <Label className="font-semibold">
                    MEMBERSHIP TYPE
                  </Label>
                  <RadioGroup
                    defaultValue="individual"
                    onValueChange={(val) =>
                      handleSelectChange("membershipType", val)
                    }
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="membership-individual" />
                      <Label htmlFor="membership-individual">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="portal" id="membership-portal" />
                      <Label htmlFor="membership-portal">Portal</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PERSONAL DETAILS */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">PERSONAL DETAILS</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="permanentAddress">
                      Permanent Address*
                    </Label>
                    <Input
                      id="permanentAddress"
                      name="permanentAddress"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="correspondenceAddress">
                      Correspondence Address*
                    </Label>
                    <Input
                      id="correspondenceAddress"
                      name="correspondenceAddress"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="education">Education*</Label>
                      <Input
                        id="education"
                        name="education"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="experience">Experience*</Label>
                      <Input
                        id="experience"
                        name="experience"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="religion">Religion*</Label>
                      <Input
                        id="religion"
                        name="religion"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Gender*</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Blood Group*</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("bloodGroup", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Marital Status</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("maritalStatus", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="unmarried">Unmarried</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* CONTACT DETAILS */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="mobile">Mobile No*</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp">WhatsApp No*</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email ID*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="website">Website*</Label>
                    <Input
                      id="website"
                      name="website"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="designation">Designation*</Label>
                    <Input
                      id="designation"
                      name="designation"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="twitter">Twitter ID</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="facebook">Facebook ID</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="instagram">Instagram ID</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* FAMILY DETAILS */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">PERSONAL DETAILS</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="mother">Mother&apos;s Name*</Label>
                      <Input
                        id="mother"
                        name="mother"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="father">Father&apos;s Name*</Label>
                      <Input
                        id="father"
                        name="father"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="spouse">Spouse&apos;s Name</Label>
                      <Input
                        id="spouse"
                        name="spouse"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="children">No. of Children</Label>
                      <Input
                        id="children"
                        name="children"
                        type="number"
                        min={0}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* CRIMINAL CASE */}
                <div className="space-y-1.5">
                  <Label>
                    Whether convicted in any case / FIR / Criminal Case*
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("crime", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* FILE UPLOADS */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="photo">Upload Photo*</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signature">Upload Signature*</Label>
                    <Input
                      id="signature"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="idProof">Upload Aadhar / Voter ID*</Label>
                    <Input
                      id="idProof"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ugCert">Upload Graduation Certificate*</Label>
                    <Input
                      id="ugCert"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="characterCert">
                      Upload Character Certificate*
                    </Label>
                    <Input
                      id="characterCert"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" className="w-fit">
                    Submit
                  </Button>

                  <Button
                    variant="link"
                    type="button"
                    className="px-0 text-primary"
                  >
                    Click here for Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT — ELIGIBILITY & BANK INFO */}
          <div className="space-y-6">
            <Card className="bg-card border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="underline">
                  Eligibility for Membership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold mb-1">A. For Individual</h3>
                  <ul className="ml-5 list-disc space-y-1">
                    <li>
                      At least 5 years working experience in any field of
                      journalism.
                    </li>
                    <li>Educational qualification at least Graduation.</li>
                    <li>
                      Not held guilty by any court of law and not named in any
                      criminal proceeding.
                    </li>
                    <li>
                      Membership fee ₹ 500/- (one time) and ₹ 100/- yearly
                      (Web Journalist&apos;s Welfare Fund).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">B. For Portal</h3>
                  <ul className="ml-5 list-disc space-y-1">
                    <li>
                      Running for at least one year and domain booked for at
                      least 2 years.
                    </li>
                    <li>
                      Membership fee ₹ 5000/- (one time) and ₹ 1000/- yearly
                      (Web Journalist&apos;s Welfare Fund).
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">
                    Bank Name &amp; Branch:
                  </span>{" "}
                  State Bank of India, Main Branch, West of Gandhi Maidan,
                  Patna.
                </p>
                <p>
                  <span className="font-semibold">Account No.:</span>{" "}
                  39069092100
                </p>
                <p>
                  <span className="font-semibold">IFSC Code:</span>{" "}
                  SBIN0000152
                </p>

                <p className="text-xs text-muted-foreground">
                  After approval and confirmation, remit the membership fee to
                  the above account by digital transfer only. Payments through
                  any other mode will not be accepted.
                </p>

                <p className="text-xs text-muted-foreground">
                  Download the filled form from the website and send a hard copy
                  to our registered office by post. Mention the payment
                  reference number and date at the back of the hard copy.
                </p>

                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Registered office:</span>{" "}
                  GIIT, 1st Floor, Parijat Complex, Opposite Punjab &amp; Sindh
                  Bank, Dakbunglow Chauraha, Patna - 800004 (Bihar).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
