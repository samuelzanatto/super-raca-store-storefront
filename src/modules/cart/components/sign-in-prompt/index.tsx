import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getRequestLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/i18n/dictionaries"

const SignInPrompt = async () => {
  const dictionary = getDictionary(await getRequestLocale())

  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {dictionary.cart.alreadyHaveAccount}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {dictionary.cart.signInForBetterExperience}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {dictionary.cart.signIn}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
