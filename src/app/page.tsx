import configLoader from "@/services/config-loader";
import PageHome from "./PageHome";

export default async () => {
    const termData = await configLoader("terms.yml");
    const sessionData = await configLoader("sessions.yml");

    return <PageHome termData={termData} sessionData={sessionData} />;
};
