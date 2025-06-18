import { LinkedinIcon, GithubIcon, XIcon } from "lucide-vue-next";

interface SocialNetworkProps {
  name: string;
  url: string;
}

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}

export const team = {
  title: "Team",
  slogan: "Meet The Team",
  teamList: [
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4D03AQFcJAFkBs0wbg/profile-displayphoto-shrink_800_800/B4DZZjxqs_H4Ag-/0/1745430687031?e=1754524800&v=beta&t=okYy2fmba-DywConwv2hlX_MdWY1YxzgEHoUNJ71bUE",
      firstName: "I. Kaan",
      lastName: "Yilmaz",
      positions: ["Front-end Developer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ismet-kaan-yilmaz-809175245/",
        },
        {
          name: "Github",
          url: "https://github.com/kaandesu",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4D22AQE4Qyp-ALfY_A/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1728851243078?e=1752105600&v=beta&t=YpkrVIa2YWQT8TiMyzZKAab1hgTr2by_nkVNrtjxb70",
      firstName: "Kaan",
      lastName: "Yilmaz",
      positions: ["Back-end Developer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ismet-kaan-yilmaz-809175245/",
        },
        {
          name: "Github",
          url: "https://github.com/kaandesu",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4D22AQF3MIq01WujXg/feedshare-shrink_2048_1536/B4DZcwutDKHwAo-/0/1748869239464?e=1752105600&v=beta&t=XURZD-8bDpJnxxgPeXD-9wsQ9O3rKjXhYtJ8WWXBtCI",
      firstName: "Ismet Kaan",
      lastName: "Yilmaz",
      positions: ["Project Lead"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ismet-kaan-yilmaz-809175245/",
        },
        {
          name: "Github",
          url: "https://github.com/kaandesu",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4D22AQEhSK8hxFVduA/feedshare-shrink_2048_1536/B4DZWFP7q2HYAo-/0/1741697301703?e=1752105600&v=beta&t=mWBmzs4hXqw34I5A4d7E8narkowrOlsfabmdnMw3Bus",
      firstName: "Ismet K.",
      lastName: "Yilmaz",
      positions: ["Software Consultant"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ismet-kaan-yilmaz-809175245/",
        },
        {
          name: "Github",
          url: "https://github.com/kaandesu",
        },
      ],
    },
  ] as TeamProps[],
  socialIcon: (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return LinkedinIcon;
      case "Github":
        return GithubIcon;
      case "X":
        return XIcon;
    }
  },
};
