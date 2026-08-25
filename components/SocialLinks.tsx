import { contact } from '@/lib/content';
import { socialIcons } from './social';

export default function SocialLinks() {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {contact.socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.name}>
            <a
              href={social.href}
              aria-label={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-hair2 transition-[border-color,background-color,transform] duration-200 hover:border-faint hover:bg-white/5 active:scale-[0.94]"
            >
              <Icon className="h-[15px] w-auto shrink-0" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
