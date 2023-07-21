import { SignInButton } from '~/features/auth/sign-in/ui';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/shared/ui/card';

export function AuthForm() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-center text-muted-foreground">
        <p>You should sign in to use budget planner</p>
        <p>
          Authentication is needed to save data for you, let you get your data
          from any device and protect it
        </p>
      </CardContent>
      <CardFooter>
        <SignInButton />
      </CardFooter>
    </Card>
  );
}
