import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function About() {
    return (
        <div className=" flex justify-center py-10 px-4">
            <Card className="w-150 flex flex-col gap-4 px-4">
                <h1 className="text-3xl font-bold flex justify-center my-6">À propos de Stackuracy</h1>
                <p>Stackuracy est un annuaire communautaire dédié aux outils, librairies et frameworks du développement web.
                    En quelques clics, vous pouvez explorer un large éventail de technologies, filtrer par langage ou par framework, et découvrir rapidement l’outil qui correspond à vos besoins.
                    Notre objectif ? Vous faire gagner du temps dans votre veille technique et vous aider à trouver rapidement la perle rare pour vos projets.</p>
                <p>Aucune inscription n’est requise : Stackuracy est entièrement gratuit et ouvert à tous.
                     Que vous soyez lead developer, freelance ou simplement curieux, vous pouvez voter pour vos favoris ou suggérer de nouveaux outils .</p>
                <p>Rejoignez-nous pour partager vos découvertes, enrichir notre base et aider la communauté à trouver, comparer et adopter les meilleures technologies web du moment.</p>
                <Link href={"/contact"} className="flex justify-center">
                  <Button className="cursor-pointer">
                    Nous contacter
                  </Button>
              </Link>
            </Card>      
        </div>
    );
}