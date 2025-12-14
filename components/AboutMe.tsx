import Image from "next/image";

export default function AboutMe() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-8">
            <div className="max-w-4xl w-full">
                <div className="bg-card rounded-lg shadow-lg p-8 md:p-12">
                    {/* Header with Name and Photo */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Anthony Hu
                            </h1>
                        </div>
                        {/* Profile Picture - Top Right Corner */}
                        <div className="mt-4 md:mt-0 md:ml-8">
                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden border-2 border-border shadow-md">
                                <Image
                                    src="/profile.jpg"
                                    alt="Anthony Hu"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <div className="space-y-4">
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Hi! I'm Anthony Hu, a second-year Math-CS major at UCSD.
                        </p>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            I'm passionate about web development and AI application development. 
                            When I'm not coding, I enjoy reading about history, playing video games, 
                            and staying active through fitness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

