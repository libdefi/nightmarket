import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BetPlaced,
  OwnerWithdrawn,
  OwnershipTransferred,
  ResultDeclared,
  RewardClaimed
} from "../generated/NightMarket/NightMarket"

export function createBetPlacedEvent(
  bettor: Address,
  option: BigInt,
  amount: BigInt
): BetPlaced {
  let betPlacedEvent = changetype<BetPlaced>(newMockEvent())

  betPlacedEvent.parameters = new Array()

  betPlacedEvent.parameters.push(
    new ethereum.EventParam("bettor", ethereum.Value.fromAddress(bettor))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("option", ethereum.Value.fromUnsignedBigInt(option))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return betPlacedEvent
}

export function createOwnerWithdrawnEvent(amount: BigInt): OwnerWithdrawn {
  let ownerWithdrawnEvent = changetype<OwnerWithdrawn>(newMockEvent())

  ownerWithdrawnEvent.parameters = new Array()

  ownerWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ownerWithdrawnEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createResultDeclaredEvent(
  winningOption: BigInt,
  winnerAddress: Address
): ResultDeclared {
  let resultDeclaredEvent = changetype<ResultDeclared>(newMockEvent())

  resultDeclaredEvent.parameters = new Array()

  resultDeclaredEvent.parameters.push(
    new ethereum.EventParam(
      "winningOption",
      ethereum.Value.fromUnsignedBigInt(winningOption)
    )
  )
  resultDeclaredEvent.parameters.push(
    new ethereum.EventParam(
      "winnerAddress",
      ethereum.Value.fromAddress(winnerAddress)
    )
  )

  return resultDeclaredEvent
}

export function createRewardClaimedEvent(
  user: Address,
  amount: BigInt
): RewardClaimed {
  let rewardClaimedEvent = changetype<RewardClaimed>(newMockEvent())

  rewardClaimedEvent.parameters = new Array()

  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardClaimedEvent
}
