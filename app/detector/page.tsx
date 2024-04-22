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
import RingLoader from "react-spinners/RingLoader";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
async function fetchResult(url: string, language: string) {
  const response = await fetch(`http://127.0.0.1:5000/detect?url=${url}&isEng=${language}`);
  const data = await response.json();
  console.log(data);
  const prediction = data.prediction; // Access the 'prediction' property from the JSON data
  return prediction;
}



export default function Detector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("t");
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

  const [text, setText] = useState('');

  const handleFetchResult = async (url: string) => {
    setIsLoading(true);
    try {
      const data = await fetchResult(url, language);

      setText(data)

    } catch (error) {
      console.log(error)
      toast({
        title: "Error fetching result",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };
useEffect(()=>{
  console.log(language)
},[language])
  return (
    <section className="p-4 m-2">
      {isLoading &&
        <div className="absolute top-[35%] z-10 left-1/2 translate-x-1/2 translate-y-1/2">
          <RingLoader color="rgba(15, 4, 4, 1)" />
        </div>}
      <div className={`${isLoading ? 'blur-sm' : 'blur-none'} flex sm:flex-row flex-col pt-4 justify-between`}>
        <div className="flex">
          <Image src='/images/empower.png' width={700} height={700} alt="logo" />
        </div>

        <div className="flex flex-col m-2 items-center gap-2">
          <h1 className="text-2xl text-center font-bold">Detect Fake Promotions and report those clip to empower the online community!</h1>
          <div className="flex w-full max-w-sm items-center space-x-8">
            <div className="flex flex-col gap-4">
              <Input type="url" placeholder="Link" onChange={(event) => setUrl(event.target.value)} />
              <Select onValueChange={(v)=>{setLanguage(v)}}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select the video language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem  value='t'>English</SelectItem>
                    <SelectItem value='f' >Tamil</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button disabled={!url} >Proceed</Button>
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
                  <Button onClick={() => {
                    getDocRef(url)
                    setIsOpen(false)
                  }}>Report</Button>
                  <Button onClick={() => {
                    handleFetchResult(url)
                    setIsOpen(false)
                  }}
                    className="w-[120px]">Detect</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {text &&
            <div className="border-4 p-4 rounded-lg">

              <h1>The give input might be <span className="font-bold">{text}</span>. Please always cross verify the results with human intelligence. Don&apos;t hesitate to hit the Request Button!</h1>
            </div>
          }
          <h1 className="w-[55%] p-2 text-centre text-red-500">These are AI generated results, so it&apos;s always advisable to cross check with human intelligence.</h1>

          <div className="flex flex-col gap-4 items-center justify-center mt-4">
            <h1 className="font-bold">Send Request for Human Verification</h1>
            <Button disabled={!url} onClick={() => setDatabase(url)} variant="secondary" className="max-w-[100px]">Request</Button>
            <h1 className="font-bold">Report this video</h1>
            <Button disabled={!url} onClick={() => getDocRef(url)} variant="destructive" className="max-w-[100px]">Report</Button>
          </div>
        </div>
      </div>
      <Toaster />

    </section>
  );
}