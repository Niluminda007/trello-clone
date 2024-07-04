import { Card, CardLabel, Label, List } from "@prisma/client";

export type ExtendedLabel = Label & { checked: boolean };

export type ExtendedCardLabel = CardLabel & { label: Label };

export type CardWithLabels = Card & { cardLabels: ExtendedCardLabel[] };

export type ListWithCards = List & { cards: CardWithLabels[] };

export type CardWithList = CardWithLabels & { list: List };
