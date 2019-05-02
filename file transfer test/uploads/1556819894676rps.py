from random import choice
print("...rock...\n")
print("...paper...\n")
print("...scissors...\n")
p1=input("Enter your choice: ")
p1=p1.lower()
p2=choice(["rock","paper","scissors"])
print(f"The computer plays: {p2}\n")
if p1!="rock" and p1!="paper" and p1!="scissors":
	print("please enter a valid value")
else:
	if p1==p2:
		print("It's a tie!")
	elif p1=="rock":
		if p2=="scissors":
			print("You win!")
		else:
			print("Computer wins")
	elif p1=="paper":
		if p2=="scissors":
			print("You win!")
		else:
			print("Computer wins")
	else:
		if p2=="paper":
			print("You win!")
		else:
			print("Computer wins")