import {
  BetPlaced as BetPlacedEvent,
  OwnerWithdrawn as OwnerWithdrawnEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ResultDeclared as ResultDeclaredEvent,
  RewardClaimed as RewardClaimedEvent
} from "../generated/NightMarket/NightMarket"
import {
  BetPlaced,
  OwnerWithdrawn,
  OwnershipTransferred,
  ResultDeclared,
  RewardClaimed
} from "../generated/schema"

export function handleBetPlaced(event: BetPlacedEvent): void {
  let entity = new BetPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bettor = event.params.bettor
  entity.option = event.params.option
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerWithdrawn(event: OwnerWithdrawnEvent): void {
  let entity = new OwnerWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResultDeclared(event: ResultDeclaredEvent): void {
  let entity = new ResultDeclared(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.winningOption = event.params.winningOption
  entity.winnerAddress = event.params.winnerAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  let entity = new RewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
