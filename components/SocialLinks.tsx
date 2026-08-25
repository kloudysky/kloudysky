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
              className="flex items-center gap-2 rounded-md border border-hair2 px-2.5 py-1.5 text-[13px] font-medium text-muted transition-[color,border-color,background-color,transform] duration-200 hover:border-faint hover:bg-white/5 hover:text-fg active:scale-[0.96]"
            >
              <Icon className="h-[13px] w-auto shrink-0" />
              {social.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
