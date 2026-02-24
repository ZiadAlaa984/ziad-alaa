import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { certificateType } from "@/lib/schemes/certificateScheme";

const BLUR_FADE_DELAY = 0.04;

export default function CertificationsSection({ certificates }: { certificates: certificateType[] | undefined }) {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"
                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">Certificates</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-center  sm:text-4xl">My Certificates</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            I've earned several certificates that showcase my skills and continuous learning in web development and related technologies
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                    {certificates?.map((certificate, id) => (
                        <BlurFade
                            key={certificate.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                key={certificate.title}
                                title={certificate.title}
                                description={certificate.description}
                                tags={certificate.technologies}
                                image={certificate.image || "/"}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

