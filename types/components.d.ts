declare module "@/components/ui/Breadcrumb" {
  interface BreadcrumbItem {
    label: string;
    href: string;
    active?: boolean;
  }

  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }

  export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
}

declare module "@/components/ui/SimilarGames" {
  import { Game } from "@/lib/games";

  interface SimilarGamesProps {
    games: Game[];
  }

  export function SimilarGames(props: SimilarGamesProps): JSX.Element;
}

declare module "@/components/ui/GameTags" {
  interface GameTagsProps {
    tags: string;
    className?: string;
    limit?: number;
  }

  export function GameTags(props: GameTagsProps): JSX.Element;
} 