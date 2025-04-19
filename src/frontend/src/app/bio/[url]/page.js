
import BioProfileCard from "@/components/_ui/BioProfileCard";
import styles from "./page.module.scss";
import { bioProfileApi } from "@/services/apiService";
import Link from "next/link";
import { LINKS } from "@/utils/links";

export default async function BioPage({ params }) {

  const { url } = await params;
  const { data } = await bioProfileApi.getByUrl(url, { include: { linkInBios: true } });

  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <BioProfileCard 
                title={data.title} 
                description={data.description}
                profilePicture={data.image}
                linkInBios={data.linkInBios}
           />
           <div className={styles.link}>
            <Link href={LINKS.REGISTER} className="underline">
            Create your own bio profile
           </Link>
           </div>
        </div>
    </main>
  )
}