import { InstallGuidePage } from "@/components/how-it-works/InstallGuidePage";

type PageProps = {
  params: Promise<{ platform: string }>;
};

export default async function Page({ params }: PageProps) {
  const { platform } = await params;
  return <InstallGuidePage platform={platform} />;
}
