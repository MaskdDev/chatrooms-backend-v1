/**
 * Generate a new random invite code.
 */
export function generateInviteCode(): string {
  // Define character set and invite code
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let inviteCode = "";

  // Generate 8 random values
  const randomArray = new Uint8Array(8);
  crypto.getRandomValues(randomArray);

  // Use random value to select character for invite code
  randomArray.forEach((number) => {
    inviteCode += characters[number % characters.length];
  });

  // Return invite code
  return inviteCode;
}
