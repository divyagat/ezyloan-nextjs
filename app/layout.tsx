import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import VoiceAssistant from "@/components/VoiceAssistant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <VoiceAssistant/>
      </body>
    </html>
  );
}
