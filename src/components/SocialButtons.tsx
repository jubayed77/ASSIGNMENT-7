"use client";

import { signIn } from "@/lib/auth-client";

const btn = "btn btn-outline h-10 min-h-10 flex-1 gap-1.5 rounded-lg border-base-300 px-[17px] font-semibold hover:border-[#ccd0cc] hover:bg-[#dadeda]";

const GoogleIcon = () => {

  return (

    <img
      src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"

      width={13}
      height={13}
      alt="Google"
    />
  );
}




const GithubIcon = () => {

  return (

    <img
      src="https://cdn.simpleicons.org/github/black/white"
      width={16}
      height={16}
      alt="GitHub"
    />
  );
}



const providers = [


  { provider: "google", label: "Google দিয়ে চালিয়ে যান", Icon: GoogleIcon },
  { provider: "github", label: "GitHub দিয়ে চালিয়ে যান", Icon: GithubIcon },

] as const;





const SocialButtons = ({ callbackUrl }: { callbackUrl: string }) => {


  return (

    <div className="flex gap-2">
      {providers.map(({ provider, label, Icon }) => (
        <button
          key={provider}
          type="button"
          className={btn}
          onClick={() => signIn.social({ provider, callbackURL: callbackUrl })}
        >
          <Icon /> {label}
        </button>
      ))}
    </div>
  );
}

export default SocialButtons;