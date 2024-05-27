# Publish

`[publish]` section specifies the configuration for publishing a project like below:

```toml
[publish]
bump_commit = true
bump_commit_message = "Bump"
```

### Available configurations

| Configuration             | Value                | Default               | Description                                     |
|---------------------------|----------------------|-----------------------|-------------------------------------------------|
| bump_commit               | boolean              | false                 | automatic commit after bump                     |
| publish_commit            | boolean              | false                 | automatic commit after publish                  |
| bump_commit_mesasge       | string               | "chore: Bump version" | commit message after bump                       |
| publish_commit_mesasge    | string               | "chore: Publish"      | commit message after publish                    |
