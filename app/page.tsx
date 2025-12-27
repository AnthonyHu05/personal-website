import { connectToDatabase } from "@/lib/mongoose";
import AboutMe from "@/components/AboutMe";

export default async function Home() {
    await connectToDatabase();
    console.log("connection successful")
    return <AboutMe />;
}
