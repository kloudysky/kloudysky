import { contact } from '@/lib/content';
import EmailLink from './EmailLink';
import { socialIcons } from './social';

const button =
  'flex h-9 w-9 items-center justify-center rounded-md border border-hair2 transition-[border-color,background-color,transform] duration-200 hover:border-faint hover:bg-white/5 active:scale-[0.94]';

export default function SocialLinks() {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {contact.socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.name}>
            <a href={social.href} aria-label={social.name} className={button}>
              <Icon className="h-[15px] w-auto shrink-0" />
            </a>
          </li>
        );
      })}
      <li>
        <EmailLink className={`${button} cursor-pointer`} />
      </li>
    </ul>
  );
}
