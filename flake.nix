{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { self
    , nixpkgs
    , utils
    }:
    utils.lib.eachDefaultSystem
      (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      with pkgs; {
        devShells.default = mkShell {
          buildInputs = [
            dprint
            nodejs
            nodePackages.pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];

          shellHook = ''
            export NIX_LD_LIBRARY_PATH=${lib.makeLibraryPath [ stdenv.cc.cc ]}
            export NIX_LD=${lib.fileContents "${stdenv.cc}/nix-support/dynamic-linker"}
          '';
        };

        formatter = nixpkgs-fmt;
      });
}
