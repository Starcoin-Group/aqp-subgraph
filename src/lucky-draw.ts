import { BigInt } from "@graphprotocol/graph-ts";
import {
  LuckyDrawEntered as LuckyDrawEnteredEvent,
  MerkleRootPublished as MerkleRootPublishedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PrizeClaimed as PrizeClaimedEvent,
  PrizePoolSet as PrizePoolSetEvent,
  RandomNumberRequested as RandomNumberRequestedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  RoundClosed as RoundClosedEvent,
  RoundOpened as RoundOpenedEvent,
  RoundSettled as RoundSettledEvent,
  Unpaused as UnpausedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/LuckyDraw/LuckyDraw";
import {
  LuckyDrawEntered,
  MerkleRootPublished,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Paused,
  PrizeClaimed,
  PrizePoolSet,
  RandomNumberRequested,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RoundClosed,
  RoundOpened,
  RoundSettled,
  Unpaused,
  Upgraded,
  RoundStats,
} from "../generated/schema";

export function handleLuckyDrawEntered(event: LuckyDrawEnteredEvent): void {
  let entity = new LuckyDrawEntered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.user = event.params.user;
  entity.ticketNumber = event.params.ticketNumber;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const formattedRoundId = event.params.roundId.toString();
  let currentRoundStats = RoundStats.load(formattedRoundId);
  if (!currentRoundStats) {
    currentRoundStats = new RoundStats(formattedRoundId);
    currentRoundStats.totalEntries = BigInt.fromI32(0);
  }
  currentRoundStats.totalEntries = currentRoundStats.totalEntries.plus(
    BigInt.fromI32(1)
  );
  currentRoundStats.save();
}

export function handleMerkleRootPublished(
  event: MerkleRootPublishedEvent
): void {
  let entity = new MerkleRootPublished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.merkleRoot = event.params.merkleRoot;
  entity.randomness = event.params.randomness;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePrizeClaimed(event: PrizeClaimedEvent): void {
  let entity = new PrizeClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.ticketId = event.params.ticketId;
  entity.user = event.params.user;
  entity.prizeTier = event.params.prizeTier;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePrizePoolSet(event: PrizePoolSetEvent): void {
  let entity = new PrizePoolSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.numOfPrizeTiers = event.params.numOfPrizeTiers;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRandomNumberRequested(
  event: RandomNumberRequestedEvent
): void {
  let entity = new RandomNumberRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.latestRandomizingBlock = event.params.latestRandomizingBlock;
  entity._usedFunds = event.params._usedFunds;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoundClosed(event: RoundClosedEvent): void {
  let entity = new RoundClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoundOpened(event: RoundOpenedEvent): void {
  let entity = new RoundOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoundSettled(event: RoundSettledEvent): void {
  let entity = new RoundSettled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.randomness = event.params.randomness;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.implementation = event.params.implementation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
