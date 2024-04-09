"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth, db } from "../authentication/firebase";
import { DocumentReference, addDoc, and, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

async function getDocRef(link: string) {
  let rrRef: DocumentReference | null = null;
  const q = query(collection(db, "reel"), and(
    where("link", "==", link),
  ));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    rrRef = doc.ref;

  });

  if (rrRef) {
    return rrRef;
  } else {
    rrRef = await addDoc(collection(db, "reel"), { link: link, status: false, request: false, date: "Aug 6 , 2019" });
    toast({ title: "Reported Successfully!" });
    return rrRef;
  }
}

async function setDatabase(url: string) {

  await updateDoc(await getDocRef(url), {
    request: true,
  }).then(() => {
    toast({ title: "Request Sent 🚀" });
  });

}

export default function Detector() {

  const [url, setUrl] = useState("");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/authentication/signin");
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="p-4 m-2">
      <div className="flex sm:flex-row flex-col pt-4 justify-between">
        <div className="flex">
          <Image src='/images/empower.png' width={700} height={700} alt="logo" />
        </div>

        <div className="flex flex-col m-2 items-center gap-2">
          <h1 className="text-2xl text-center font-bold">Detect Fake Promotions and report those clip to empower the online community!</h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="url" placeholder="Link" onChange={(event) => setUrl(event.target.value)} />
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={!url}>Proceed</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Proceed</DialogTitle>
                  <DialogDescription>
                    Make changes to your url here. Choose your option when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center gap-4 py-4">

                  <Label className="text-right">
                    Link
                  </Label>
                  <Input id="link" value={url} className="col-span-3" />


                </div>
                <DialogFooter className="gap-1">
                  <Button onClick={() => getDocRef(url)}>Report</Button>
                  <Button className="w-[120px]">Detect</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <h1 className="w-[55%] p-2 text-centre text-red-500">These are AI generated results, so it&apos;s always advisable to cross check with human intelligence.</h1>

          <div className="flex flex-col gap-4 items-center justify-center mt-4">
            <h1 className="font-bold">Send Request for Human Verification</h1>
            <Button  disabled={!url} onClick={() => setDatabase(url)} variant="secondary" className="max-w-[100px]">Request</Button>
            <h1 className="font-bold">Report this video</h1>
            <Button  disabled={!url} onClick={() => getDocRef(url)} variant="destructive" className="max-w-[100px]">Report</Button>
          </div>
        </div>
      </div>
      <Toaster />

    </section>
  );
}