import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "./ContactForm"

function ContactContent() {
    //       contact: {
    //     email: "ziadalaa984@gmail.com",
    //     tel: "+201225747823",
    //     social: {
    //       GitHub: {
    //         name: "GitHub",
    //         url: "https://github.com/ZiadAlaa984",
    //         icon: Icons.github,
    //         navbar: true,
    //       },
    //       LinkedIn: {
    //         name: "LinkedIn",
    //         url: "https://www.linkedin.com/in/ziad-alaa-dev/",
    //         icon: Icons.linkedin,
    //         navbar: true,
    //       },
    //       TikTok: {
    //         name: "TikTok",
    //         url: "https://www.tiktok.com/@ziadalaadev",
    //         icon: Icons.tiktok,
    //         navbar: true,
    //       },
    //       WhatsApp: {
    //         name: "WhatsApp",
    //         url: "https://wa.me/201225747823",
    //         icon: Icons.whatsapp,
    //         navbar: true,
    //       },
    //       Email: {
    //         name: "Send Email",
    //         url: "mailto:ziadalaa984@gmail.com",
    //         icon: Icons.email,
    //         navbar: false,
    //       },

    //     },
    //   },
    return (
        <Card className="border shadow mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contact</CardTitle>

            </CardHeader>
            <CardContent>
                {/* <ContactForm contact={contact} /> */}
            </CardContent>
        </Card >
    )
}

export default ContactContent