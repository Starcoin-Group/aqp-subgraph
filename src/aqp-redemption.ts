import {
  Redeemed as RedeemedEvent,
  TicketsClaimed as TicketsClaimedEvent,
} from "../generated/ContractAqpRedemption/ContractAqpRedemption";
import { Redeemed, TicketsClaimed } from "../generated/schema";

export function handleRedeemed(event: RedeemedEvent): void {
  let entity = new Redeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTicketsClaimed(event: TicketsClaimedEvent): void {
  let entity = new TicketsClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
