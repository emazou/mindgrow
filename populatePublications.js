require('dotenv').config()

const db = require('./config/database')

const publications = require('./models/Publication')

publications.create(


    {
        title: 'Cannabinoid receptor agonist shows promise for autoimmune condition treatment',
        description: 'The study describes the success of using lenabasum – a cannabinoid receptor type 2 (CB2) agonist that triggers the resolution of inflammation – to treat amyopathic dermatomyositis. Amyopathic dermatomyositis is a rare systemic autoimmune disease with distinctive cutaneous features. These features are frequently accompanied by muscle inflammation, interstitial lung disease and malignancy. However, amyopathic dermatomyositis presents as an active skin disease without muscle involvement, Until the approval of intravenous immunoglobulin last year, there had been no new treatments for the condition for over 60 years. Results from a Phase 2 clinical study have shown that lenabasum – an investigational drug under development – was a well-tolerated medication with no serious or severe side effects, offering the first oral therapeutic option specifically for the skin-only form of this autoimmune condition. It tested the potential benefits of activating the endocannabinoid system to reduce the inflammation causing the symptoms. More than 40 per cent of the patients taking lenabasum demonstrated significant improvements. When it came to the results of the Phase 3, for these participants, the lenabasum demonstrated a statistically and medically significant benefit at 28 weeks, suggesting differences in the skin responses between amyopathic and classic dermatomyositis patients.',
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Health',
        url: 'https://cannabishealthnews.co.uk/2022/09/27/cannabinoid-receptor-agonist-autoimmune-condition-treatment/',
        photo: 'https://cannabishealthnews.co.uk/wp-content/uploads/2022/09/Screenshot-2022-09-27-at-15.21.54.png',
    },

    {
        title: 'Medical cannabis improves quality of life in autistic adults – UK study',
        description: 'A new UK study shows that medical cannabis could improve quality of life in adults with autism spectrum disorder (ASD). Autism Spectrum Disorder (ASD) is a neurological development disorder which affects an estimated 700,000 people in the UK. Those with ASD commonly face challenges as a result of additional symptoms associated with the diagnosis, including severe anxiety and insomnia.  Since medical cannabis was rescheduled in 2018, cannabis-based medicinal products (CBMPs) have been  prescribed by specialists for several conditions, including chronic pain, anxiety, and post-traumatic stress disorder. The treatment has also been identified as a promising novel therapeutic for symptoms and co-morbidities related to ASD. The study, which used data collected from the UK Medical Cannabis Registry (UKMCR) run by Sapphire Medical Clinics, showed that following initiation of treatment with medical cannabis anxiety was reduced, sleep and associated symptoms improved, as well as overall health-related quality of life.  This is the first observational study of its kind that has focused on the impact of CBMPs on autistic adults at a medical cannabis clinic.',
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Health',
        url: 'https://cannabishealthnews.co.uk/2022/09/21/uk-data-shows-cannabis-improves-quality-of-life-in-autistic-adults/',
        photo: 'https://swaddle-wkwcb6s.stackpathdns.com/wp-content/uploads/2022/09/Miscellaneous-1.jpg',
    },

    {
        title: 'CBD and epilepsy – study confirms whole-plant benefits',
        description: 'A whole-plant cannabis product is potentially more effective in the treatment of epilepsy than isolated forms of CBD, according to recent findings. Many experts have argued, anecdotally, that products derived from whole-plant cannabis – containing a range of different cannabinoids and terpenes – are more effective than those which contain isolated forms of CBD, particularly in complex conditions such as epilepsy. A team at the Lambert Initiative for Cannabinoid Therapeutics at the University of Sydney examined the effect of a nutraceutical product, extracted from the Cannabis Sativa L. plant on voltage-gated sodium channels in epilepsy. These sodium channels initiate action in the brain neurons, resulting in epileptic seizures. Inhibition of the sodium channels is thought to be part of the mechanism of action of many anticonvulsant medications. Recent studies have suggested that purified, or isolated, CBD also acts as an inhibitor of these channels therefore reducing seizures frequency.',
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Health',
        url: 'https://cannabishealthnews.co.uk/2022/08/05/cbd-epilepsy-study-confirms-whole-plant-benefits-cbd22/',
        photo: 'https://www.epilepsiamadrid.com/wp-content/uploads/2017/06/cannabis_cerebro-1280x640.jpg',
    },

    {
        title: 'CBD for Pets, Top 3 Pros and Cons',
        description: "When people talk about giving marijuana to pets, they are really talking about the use of CBD products derived from hemp. The California Veterinary Medical Board explains that CBD is the “abbreviation for cannabidiol, which is one out of 60 naturally occurring compounds present in cannabis. It is the second-most prevalent cannabinoid in both hemp and marijuana and is nonpsychoactive.” CBD extracted from hemp contains less than 0.3% THC, which is the compound in marijuana that causes the high. Because we believe in informed choice here are a con and a pro so you can decided what is best for the furry member of your family. PRO: A majority of veterinarians agree that CBD helps animals. 79% of vets with clinical experience using cannabis products said CBD was somewhat or very helpful for chronic pain in animals; over 62% said it was helpful for managing anxiety. Over 80% of those vets said there were no reports of adverse effects aside from sedation. CON: CBD pet products are unregulated.The lack of regulation means pet owners could be buying CBD with unlisted ingredients that are potentially toxic to their pets, such as THC. Experts say these products are in need of testing for the presence of heavy metals, pesticides, and THC. “Its really the Wild West out there,” said S. David Moche, MBA, CEO of a veterinary medicine company that sells CBD products. Researchers at the University of Pennsylvania found that 70% of the CBD products they analyzed didnt match the concentration listed on the label, and 21% of their samples contained THC despite it not being on the label. The US Food and Drug Administration FDA said in a statement, “We want to stress that FDA has not approved cannabis for any use in animals, and the agency cannot ensure the safety or effectiveness of these products. According to the FDA, animals who ingest cannabis could suffer negative side effects such as lethargy, depression, heavy drooling, vomiting, agitation, tremors, and convulsions.",
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Pets',
        url: 'https://www.procon.org/headlines/marijuana-for-pets-top-3-pros-and-cons/',
        photo: 'https://media.istockphoto.com/photos/dog-at-the-veterinarian-picture-id1357774532?b=1&k=20&m=1357774532&s=170667a&w=0&h=PJbmtaqJdyO91WC6aOKMddABujlK17aHfXKQBJsmV6U=',
    },

    {
        title: 'Cannabis in Veterinary Medicine: Cannabinoid Therapies for Animals',
        description: 'The use of cannabis for animal species is an area of growing interest, largely due to the therapeutic benefits being observed for humans and animals in the era of cannabis legalization. The close relationship humans have with their pets and other veterinary species has led to a renewed interest in the possibility and promise of cannabis to treat similar health issues in the animal community. Its researchhas been observed in different ailments such as:  Clinical Efficacy of CBD for TreatingOsteoarthritis and Refractory Epilepsyin the Dog, where the treatment had a significative improvement in the quality of life of the pets.  The effects of CBD in Inflammatory Conditions, and how it helps reducing the inflammation thanks to the receptors present in the immune cells, modifying the inﬂammatory response.  Studies of the CBD results in an upregulation ofthe expression of the intracellular adhesion molecules(ICAM) which in turn prevents the metastasis of cancerouscells beyond the tumor site. This studies and more open the door for more veterinarian treatments that improve the quality of life of our none-human family members. ',
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Pets',
        url: 'https://www.researchgate.net/publication/333306722_Cannabis_in_Veterinary_Medicine_Cannabinoid_Therapies_for_Animals',
        photo: 'https://moderndogmagazine.com/sites/default/files/styles/slidehsow-banner/public/images/articles/top_images/Header_20.jpg?itok=k1Jk58bP',
    },

    {
        title: 'The Critical Importance Of Social Equity In The Cannabis Industry',
        description: 'What happens when a movement becomes an industry? That’s precisely what’s playing out every day in the commercial regulated cannabis market. It’s important to consider how the cannabis industry has a more profound burden and responsibility to social equity than other industries. It’s no secret that the prohibition of cannabis disproportionately and adversely impacted people of color. To counter this, many states and cities have implemented social equity programs in connection with the legalization of medical or adult-use cannabis. Social equity deals with justice and fairness within social policy. These programs attempt to ensure that people of color, and those with marijuana offenses prior to legalization, be afforded an opportunity to participate, meaningfully, in this burgeoning industry.The demand for social equity is currently very high in the industry and has been heightened by recent events: the mobilization of the Black Lives Matter movement, nationwide protests against police brutality, and the like. Numerous large cannabis companies are now talking about “reinvesting in communities” and “social equity,” but it remains to be seen whether they will put their money where their mouth is.   We recognize that we must do more. We created an Diversity and Inclusion Committee dedicated to advocating for Black, People of Color and LGBTQ employment candidates, clients, and employees. The intention of this committee is to challenge us and help us address the injustices each of us witnesses every day. Our entire staff will receive unconscious bias training for our entire staff, managers, and executive team. The submitted candidate pool for posted openings at HLG has been far less than diverse. While we can’t control that fact directly, we can (and will) take steps to ensure that we post job opportunities in a greater variety of forums to draw a wider pool of candidates. ',
        user: '633b51df2cc7662a55a8de17',
        date: '1970-01-01',
        category: 'Social Impact',
        url: 'https://www.forbes.com/sites/roberthoban/2020/08/31/the-critical-importance-of-social-equity-in-the-cannabis-industry/?sh=7d160adc1a6d',
        photo: 'https://www.axialhealthcare.com/wp-content/uploads/2018/12/Medical-Marijuana-1-1024x560.jpeg',
    },

)



